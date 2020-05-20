/*--------------------------------------------------
    SERVICE: Correction
    @auteur: Lorenzo NADAL SANTA;
Ce fichier contient l'ensemble des fonctions necessaires
au bon deroulement d'une correction;

DESCRIPTION DU PROCESSUS DE CORRECTION :

Nous avons choisi de laisse le script de correction
a charge du professeur/encadrant charge du projet;

Pour que la correction se deroule bien le script
de correction doit fonction de la maniere suivante:

- Etre un script shell;
- Executer le script qui lui est passé en argument;
- Avoir pour seul valeur de sortie vers le stdin 
la note obtenue en fin de correction;
- Toutes les autres sorties doivent etre redirigées
vers une autre voie;
-------

AU debut nous pensions executer un test sur une
fonction et comparer l'output de la fonction vs
l'output attendu mais nous avons changé d'optique;
--------------------------------------------------*/

/* PKG */
const express = require('express');
const router = express.Router();
const path = require('path');
const shell = require('shelljs');
const spawn  = require('child_process').spawn;

/* DB */
const mysqlConnection = require('../../connection_db');

/* MODULES */
const ProjetService = require('../ProjetService');
const UserService = require('../UserService');
const tkn = require('../tokenverify');

/* MULTER CONFIG */

var multer = require('multer');
var storage = multer.diskStorage({
    destination: './services/correction/tmp',
    filename: function (req, file, cb) {
        let nameuploadedfile = req.username + '_' + Date.now() + path.extname(file.originalname);
        cb(null, nameuploadedfile)
        req.nameuploadedfile = nameuploadedfile;
        insert_file(req.courriel, nameuploadedfile, req.params.id);
    }
})
var upload = multer({ storage: storage });

/*--------------------------------------------------
    var: Multer;
    @auteur: Lorenzo NADAL SANTA;
Multer est une librairie qui permet d'enregistrer un
fichier transmis par http. Ici la configuration
specifie le chemin d'enregistrement du fichier ->
'./services/correction/tmp' et le nom du fichier 
au format : username_date.ext
--------------------------------------------------*/

/* CORRECTION SERVICE ENDPOINTS*/


router.get('/', (req, res) => {    
    res.send("from Correction Service");
    res.end();
});

/*--------------------------------------------------
    get /
    url: http://localhost:3000/projet/;
    @auteur: Lorenzo NADAL SANTA;
/projet/upload_projet/:id
--------------------------------------------------*/

router.post('/upload_projet/:id', tkn.verifyToken, upload.single('myFile'), async (req, res) => {
    let id = req.params.id;
    let filename = req.nameuploadedfile;
    let data = await correction(id, filename, req.courriel);

    if(data === false)
    {
        res.status(409).send();
    }
    else
    {
        res.status(200).send(data);
    }
});

/*--------------------------------------------------
    post /
    url: http://localhost:3000/projet/upload_projet/
    :id;
    @auteur: Lorenzo NADAL SANTA;
    depot et correction d'un projet sur le serveur 
--------------------------------------------------*/

router.get('/historique/:id', tkn.verifyToken, async (req, res) => {
    let id = req.params.id;
    let courriel = req.courriel;
    let historique = await get_historique(id, courriel);

    if (historique === false) {
        res.status(404).send();
    }
    else {
        res.status(200).send(historique);
    }
});

/*--------------------------------------------------
    get /
    url: http://localhost:3000/projet/historique/:id
    @auteur: Lorenzo NADAL SANTA;
permet d'obtenir l'historique des tentatives de
l'utilisateur sur le projet identifie par 'id'
--------------------------------------------------*/

/* UTILITIES */

 function correction(idprojet, filename, courriel) {
    return new Promise(async resolve => {
        let old_note = await get_old_note(idprojet, courriel);
        let FileCorrection = await get_correction_file(idprojet);
        let pathRes = "./services/correction/tmp/" + FileCorrection + ".res";
        let iddepots = await get_id_depot(filename);
        let pathExec = './services/correction/correct.sh ' + filename + " " + FileCorrection + " > " + pathRes;

        if (iddepots === false) {
            console.log("iddepots non valide")
            resolve(false)
        }
        else if (FileCorrection === false) {
            console.log("Fichier de correction non valide")
            resolve(false)
        }
        else if (old_note === false) {
            console.log("erreur old_note")
            resolve(false)
        }
        else {
            pathExec = './services/correction/correct.sh ' + filename + " " + FileCorrection + " > " + pathRes;
            spawn('sh', [pathExec], {
                stdio:'ignore',
                detached: true,
                shell: true
            })
            setTimeout(process_result, 15000, pathRes, iddepots, old_note, courriel, idprojet)
            resolve(true);
        }
    });
}

/*--------------------------------------------------
    function Correction(idprojet, filename, courriel)
    @auteur: Lorenzo NADAL SANTA;
- idprojet correspond a l'identifiant du projet
- nom du fichier qui doit etre corrige
- courriel correspond a l'identifiant utilisateur

Cette fonction est la fonction principale pour la 
correction;
elle permet de mettre ensemble les donnees requises
pour mener a bien la correction, c'est a dire:
- iddepots: l'id correponsant a la correction en cours
- Filecorrection le fichier correcteur
- la note la haute obtenue

une fois ces valeurs obtenues elle lance le script
shell (/services/correction/correct.sh) qui va
initialiser un nouveau container docker specifique a
cette correction; afin de ne pas attendre la fin de
la correction ce fichier est executer en detached mode
ce qui permet au serveur de repondre aux autres requetes;
nous avons estimer que 15 secondes est un bon delai
pour s'assurer de la fin de la correction qui est 
assuree par la fonction process_result ci-dessous;
--------------------------------------------------*/

function process_result(pathRes, iddepots, old_note, courriel, idprojet)
{
    let note = shell.cat(pathRes);
    let result = Number(note);

    insert_note(result, iddepots, old_note, courriel, idprojet);
    set_pts(courriel, result, old_note);
    console.log("fin de la correction pour :" + courriel);
}

/*--------------------------------------------------
    function process_result(pathRes,iddepots, 
            old_note, courriel, idprojet)
    @auteur: Lorenzo NADAL SANTA;
- pathRes correspond au chemin vers le resultat de
la correction
- iddepots correspond a l'id de la correction
- old_note correspond a la note max obtenue sur ce
projet;
- courriel correspond a l'identifiant utilisateur
- idprojet correspond a l'identifiant projet

Cette fonction permet de recuperer le resultat de la
correction, d'inserer la note dans la base de donnee
et d'attribuer les pts obtenus a l'utilisateur;
--------------------------------------------------*/

async function set_pts(courriel, note, old_note)
{
    var pts;
    let sqlquery;
    var globalexp = await UserService.get_globalexp(courriel);
    var result;

    if (old_note > note || note < 0)
    {
        return ;
    }

    if (old_note != null && old_note > 0)
    {
        pts = Number(note) - Number(old_note);
    }
    else
    {
        pts = Number(note);
    }
    globalexp = Number(globalexp);
    result = globalexp + pts;
    sqlquery = "UPDATE user SET exp='" + result + "' WHERE courriel='" + courriel + "';";
    mysqlConnection.query(sqlquery, (err, rows, field) =>
    {
        if (err)
        {
            console.log(err);
        }
    });
}

/*--------------------------------------------------
    function set_pts(courriel, note, old_note)
    @auteur: Lorenzo NADAL SANTA;
- courriel : correspond a l'identifiant utilisateur
- note : la note obtenue
- la note max obtenue parmis toutes les tentatives

Cette fonction permet d'attribuer a l'utilisateur
les points obtenus a la suite de la correction
--------------------------------------------------*/

function get_old_note(id, courriel) {
    return new Promise(resolve => {
        let sqlquery = "SELECT * FROM registereduser WHERE projetId='" + id + "' AND userCourriel='" + courriel + "';";
        let note;

        mysqlConnection.query(sqlquery, (err, rows, field) => {
            if (err) {
                console.log(err);
                resolve(false);
            }
            else if (typeof (rows[0]) == 'undefined') {

                resolve(false);
            }
            else {
                if (rows[0].note === null)
                {
                    note = -1;
                }
                else 
                {
                    note = rows[0].note;
                }
                resolve(note);
            }
        });
    })
}

/*--------------------------------------------------
    function get_old_note(id, courriel)
    @auteur: Lorenzo NADAL SANTA;
- courriel : correspond a l'identifiant utilisateur
- id : identifiant projet

Cette fonction permet de recuperer la note la plus
haute obtenue au projet ID si c'est la premiere
tentative, la note est initialise a -1 ce qui
permet de ne pas la comptabiliser dans fonction 
set_pts;
--------------------------------------------------*/

function get_historique(id, courriel) {
    return new Promise(resolve => {
        let sqlquery = "SELECT * FROM depots WHERE projetid='" + id + "' AND courriel='" + courriel + "';"

        mysqlConnection.query(sqlquery, (err, rows, field) => {
            if (err) {
                console.log(err);
                resolve(false);
            }
            else if (typeof (rows[0]) == 'undefined') {
                resolve(false);
            }
            else {
                resolve(rows);
            }
        });
    })
}

/*--------------------------------------------------
    function  get_historique(id, courriel)
    @auteur: Lorenzo NADAL SANTA;
- courriel : correspond a l'identifiant utilisateur
- id : identifiant projet

Cette fonction permet de recuperer l'ensemble des 
tentatives de l'utilisateur sur un projet ID
--------------------------------------------------*/

async function insert_file(courriel, fileName, idprojets) {
    let tentative = await ProjetService.get_tentative(idprojets, courriel);
    let sqlquery = "INSERT INTO depots (projetid, courriel, filename, tentative) VALUES ('" + idprojets + "', '" + courriel + "', '" + fileName + "', '" + tentative +"');";

   // console.log(sqlquery);
    mysqlConnection.query(sqlquery, (err, rows, field) => {
        if (err) {
            console.log(err);
        }
    })
}

/*--------------------------------------------------
    function  insert_file(courriel, fileName, idprojets) )
    @auteur: Lorenzo NADAL SANTA;
- courriel : correspond a l'identifiant utilisateur
- idprojets : identifiant projet
- fileName : nom du fichier qui doit etre corrige

Cette fonction permet d'ajouter a la table depots,
le nom du fichier que l'utilisateur a soumis;
--------------------------------------------------*/

function get_id_depot(fileName) {
    return new Promise(resolve => {
        let sqlquery = "SELECT iddepots FROM depots WHERE filename='" + fileName + "';";
        let id;

        mysqlConnection.query(sqlquery, (err, rows, field) => {
            if (err) {
                console.log(err);
                resolve(false);
            }
            else if (typeof (rows[0]) == 'undefined') {
                resolve(false);
            }
            else {
                id = rows[0].iddepots;
                resolve(id);
            }
        });
    });
}

/*--------------------------------------------------
    function  get_id_depot(fileName)
    @auteur: Lorenzo NADAL SANTA;
- fileName : nom du fichier qui doit etre corrige

Cette fonction permet de recuperer l'identifiant de
du depots de la correction du fichier "fileName"
--------------------------------------------------*/

function insert_note(note, iddepots, old_note, courriel, idprojets) {
    let sqlquery = "UPDATE depots SET note='" + note + "' WHERE iddepots='" + iddepots + "';";

    mysqlConnection.query(sqlquery, (err, rows, field) => {
        if (err) {
            console.log(err);
        }
    })
    if (old_note < note) {
        let sqlquery2 = "UPDATE registereduser SET note='" + note + "' WHERE projetId='" + idprojets + "' AND userCourriel='" + courriel + "';";

        mysqlConnection.query(sqlquery2, (err, rows, field) => {
            if (err) {
                console.log(err);
            }
        });
    }
}

/*--------------------------------------------------
    function  insert_note(note, iddepots, old_note, 
        courriel, idprojets)
    @auteur: Lorenzo NADAL SANTA;
- note : note obtenue pour la correction en cours
- old_note : note max obtenue parmis toutes les
tentatives
- courriel : identifiant utilisateur
- iddepots : identifiant de la correction en cours
- idprojets : identifiant du projet traite

Cette fonction permet d'ajouter la note obtenue a la
derniere correction effectuee
--------------------------------------------------*/

function get_correction_file(idprojet) {
    return new Promise(resolve => {
        let sqlquery = "SELECT fileNameCorrection FROM projets WHERE idprojets='" + idprojet + "';";

        mysqlConnection.query(sqlquery, (err, rows, field) => {
            if (err) {
                console.log(err);
                resolve(false);
            }
            else if (typeof (rows[0]) == 'undefined') {
                resolve(false);
            }
            else {
                resolve(rows[0].fileNameCorrection)
            }
        });
    });
}

/*--------------------------------------------------
    function  get_correction_file(idprojet)
    @auteur: Lorenzo NADAL SANTA;
- idprojet : identifiant du projet traite

Cette fonction permet de recuperer le nom du fichier
correcteur afin de le lancer;
--------------------------------------------------*/


/* ----------------------- 
function get_output_file(idprojet)
{
    return new Promise(resolve => {
        let sqlquery = "SELECT fileNameOutput FROM projets WHERE idprojets='" + idprojet + "';";

        mysqlConnection.query(sqlquery, (err, rows, field) => {
            if (err) {
                console.log(err);
                resolve(false);
            }
            else if (typeof (rows[0]) == 'undefined') {
                resolve(false);
            }
            else {
                resolve(rows[0].fileNameOutput)
            }
        });
    });
}
*/
module.exports = { 
    router: router, 
    set_pts: set_pts
}