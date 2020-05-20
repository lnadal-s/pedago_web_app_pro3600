/*--------------------------------------------------
    SERVICE: ProjetService;
    @auteur: Lorenzo NADAL SANTA;
L'ensemble des fonctions de ce service servent a la
restitution de donnee vers l'application client
D'autre fonctions concernant les projets peuvent se
situer dans le service de correction dont le chemin est
/back-end/services/correction/CorrectionService.js
--------------------------------------------------*/

/* PKG */
const mysqlConnection = require('../connection_db');

/* PROJECTS SERVICES*/

function get_projets(id, courriel) {
    return new Promise(resolve => {
        let sqlquery = "SELECT * from projets";

        if (id === null) {
            sqlquery = sqlquery + ";";
        }
        else {
            sqlquery = sqlquery + " WHERE idprojets=" + id + ";";
        }
        mysqlConnection.query(sqlquery, async (err, rows, field) => {
            if (err) {
                console.log(err);
                resolve(false);
            }
            else if (typeof (rows[0]) == 'undefined') {
                resolve(false);
            }
            else {
                await get_access(rows, courriel);
                await get_registered(rows, courriel);
                await get_stats(id, rows);
                rows[0].note = await get_note(id, courriel);
                rows[0].encadrant = await get_encadrant(rows[0].encadrantId);
                resolve(rows);
            }
        });
    });
};

/*--------------------------------------------------
    Fonction: "get_projets(id, courriel)";
    @auteur: Lorenzo NADAL SANTA;
La fonction get_projets prend en parametre un id de
type number (entier positif) et un courriel.
Ces parametres correspondents aux informations enre-
gistres dans la base de donnnees; l'Id correspond a
un identifiant projet.
Elle retourne les informations specifiques au projet
Id, si Id est null la fonction retourne l'ensemble 
des projets de la base de donnees;
--------------------------------------------------*/

function get_access(rows, courriel) {
    return new Promise(async resolve => {
        let nbprojet = rows.length;
        let k = 0;

        while (k < nbprojet) {
            rows[k].access = await check_cursus(rows[k].moduleId, courriel, rows[k].exprequis);
            k++;
        }
        resolve(true);
    });
}

/*--------------------------------------------------
    Fonction: "get_access(rows, courriel)";
    @auteur: Lorenzo NADAL SANTA;
- rows une liste de projets
- courriel l'utilisateur qui a fait la requete

cette fonction ajoute a chaque projet si l'utilisateur
a le droit ou non de s'inscrire par le biais de la 
fonction check_cursus decrite dessous;
--------------------------------------------------*/

function check_cursus(moduleId, courriel, exprequis) {
    return new Promise(async resolve => {

        let user_exp = await get_validation_module(moduleId, courriel);

        if (user_exp >= exprequis) {
            resolve(true);
        }
        else {
            resolve(false);
        }
    });
}

/*--------------------------------------------------
    Fonction: "check_cursus(moduleId, courriel, exprequis)";
    @auteur: Lorenzo NADAL SANTA;
- moduleId identifiant du module
- courriel l'utilisateur qui a fait la requete
- exprequis correspond a l'experience requise pour
avoir acces au projet

cette fonction calcule l'experience de l'utilisateur
et verifie si elle est assez haute pour avoir le droit
a l'acces au projet;
--------------------------------------------------*/

function get_stats(id, rows) {
    return new Promise(async resolve => {
        let data1;
        let data2;

        if (id === null) {
            resolve(false);
        }
        else {
            data1 = await get_data(id, 1);
            data2 = await get_data(id, 2);
            rows[0].data1 = await process_data(data1);
            rows[0].data2 = await process_data(data2);
            resolve(true);
        }
    })
}

/*--------------------------------------------------
    Fonction: "get_stats(id, rows)";
    @auteur: Lorenzo NADAL SANTA;
- id correspond a l'identifiant d'un projet;
- rows correspond au retour d'une requete SQL;
Rows contient les donnees du projet id
la fonction permet de traiter et d'nserer les re-
sultats des eleves pour le projet identifie par id
pour les tentatives 1 et 2;
--------------------------------------------------*/

function get_encadrant(id) {
    return new Promise(resolve => {
        sqlquery = "SELECT * FROM encadrant WHERE idencadrant='" + id + "';";

        mysqlConnection.query(sqlquery, (err, rows, field) => {
            if (err) {
                console.log(err)
                resolve(false);
            }
            else if (typeof (rows[0]) == 'undefined') {
                resolve(false);
            }
            else {
                resolve(rows[0].nom);
            }
        })
    })
}

/*--------------------------------------------------
    Fonction: "get_encadrant(id)";
    @auteur: Lorenzo NADAL SANTA;
- id correspond a l'identifiant d'un projet;
La fonction retourne l'encadrant correspondant au
projet identifie par id;
--------------------------------------------------*/

function get_note(id, courriel) {
    return new Promise(resolve => {
        let sqlquery = "SELECT note FROM registereduser WHERE projetId='" + id + "' AND userCourriel='" + courriel + "';"

        mysqlConnection.query(sqlquery, (err, rows, field) => {
            if (err) {
                console.log(err);
                resolve(false);
            }
            else if (typeof (rows[0]) == 'undefined') {
                resolve(null);
            }
            else {
                resolve(rows[0].note);
            }
        });
    });
}

/*--------------------------------------------------
    Fonction: "get_note(id, courriel)";
    @auteur: Lorenzo NADAL SANTA;
- id correspond a l'identifiant d'un projet;
- courriel correspond a l'identifiant d'un utilisa-
teur;
La fonction retourne la valeur de la note maximale
obtenue pour le projet identifie par id;
--------------------------------------------------*/

function subscribe(id, courriel) {
    return new Promise(async resolve => {
        let moduleId = await get_module_id(id);
        let mysqlquery = "INSERT INTO registereduser (userCourriel, projetId, note, moduleId) VALUES ('" + courriel + "', '" + id + "', " + null + ", '" + moduleId + "');";
        
        mysqlConnection.query(mysqlquery, (err) => {
            if (err) {
                console.log(err);
                resolve(false);
            }
            else {
                resolve(true)
            }
        });
    })
}

/*--------------------------------------------------
    Fonction: "subscribe(id, courriel)";
    @auteur: Lorenzo NADAL SANTA;
- id correspond a l'identifiant d'un projet;
- courriel correspond a l'identifiant d'un utilisa-
teur;
La fonction inscrit l'utilisateur au projet id
--------------------------------------------------*/

function unsubscribe(id, courriel) {
    return new Promise(resolve => {
        let mysqlquery = "DELETE FROM registereduser WHERE userCourriel='" + courriel + "' AND projetId=" + id + ";";
        mysqlConnection.query(mysqlquery, (err) => {
            if (err) {
                console.log(err);
                resolve(false);
            }
            else {
                resolve(true)
            }
        });
    })
}

/*--------------------------------------------------
    Fonction: "unsubscribe(id, courriel)";
    @auteur: Lorenzo NADAL SANTA;
- id correspond a l'identifiant d'un projet;
- courriel correspond a l'identifiant d'un utilisa-
teur;
La fonction desinscrit l'utilisateur au projet id
--------------------------------------------------*/

/* UTILITIES */

function get_module_id(idprojets) {
    return new Promise(resolve => {
        let sqlquery = "SELECT moduleId FROM projets WHERE idprojets='" + idprojets + "'";

        mysqlConnection.query(sqlquery, (err, rows, field) => {
            if (err) {
                console.log(err);
                resolve(false);
            }
            else if (typeof (rows[0]) == 'undefined') {
                resolve(false);
            }
            else {
                resolve(rows[0].moduleId)
            }
        });
    });
}

/*--------------------------------------------------
    Fonction: "get_module_id(idprojets";
    @auteur: Lorenzo NADAL SANTA;
- idprojets correspond a l'identifiant utilisateur;
La fonction retourne l'id du module correspondant au
projet "idprojets";
--------------------------------------------------*/

function is_registered(idprojet, userCourriel) {
    return new Promise(resolve => {
        let sqlquery = "SELECT * from registereduser WHERE userCourriel='" + userCourriel + "' AND projetId=" + idprojet + ";";
        mysqlConnection.query(sqlquery, (err, rows, fields) => {
            if (err) {
                console.log(err);
                resolve(false);
            }
            else if (typeof (rows[0]) == 'undefined') {
                resolve(false);
            }
            else {
                resolve(true);
            }
        });
    });
}

/*--------------------------------------------------
    Fonction:"is_registered(idprojet, userCourriel)";
    @auteur: Lorenzo NADAL SANTA;
- idprojet correspond a l'identifiant d'un projet;
- userCourriel correspond a l'identifiant d'un uti-
lisateur;
La fonction verifie si l'utilisateur est inscrit au
projet id;
--------------------------------------------------*/

async function get_registered(rows, userCourriel) {
    let size = rows.length;
    let k = 0;

    while (k < size) {
        rows[k].isRegistered = await is_registered(rows[k].idprojets, userCourriel);
        k++;
    }
}

/*--------------------------------------------------
    Fonction:"get_registered(rows, userCourriel)";
    @auteur: Lorenzo NADAL SANTA;
- rows correspond a l'ensemble des projets;
- userCourriel correspond a l'identifiant d'un uti-
lisateur;
La fonction verifie si l'utilisateur est inscrit aux
projets;
--------------------------------------------------*/

function get_tentative(id, courriel) {
    return new Promise(resolve => {
        let sqlquery = "SELECT MAX(tentative) AS tentativemax FROM depots WHERE projetid='" + id + "' AND courriel='" + courriel + "';";

        mysqlConnection.query(sqlquery, (err, rows, field) => {
            if (err) {
                console.log(err);
            }
            else if (typeof (rows[0]) == 'undefined') {
                resolve(false)
            }
            else {
                resolve(rows[0].tentativemax + 1)
            }
        });
    });
}

/*--------------------------------------------------
    Fonction:"get_tentative(id, courriel)";
    @auteur: Lorenzo NADAL SANTA;
- id correspond a l'identifiant du projet;
- courriel correspond a l'identifiant d'un uti-
lisateur;
la fonction recupere le numero de la derniere tenta-
tive de l'utilisateur;
--------------------------------------------------*/

function get_data(id, tentative) {
    return new Promise(resolve => {
        let sqlquery = "SELECT note FROM notetriee WHERE tentative='" + tentative + "' AND projetid='" + id + "';";

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
    });
}

/*--------------------------------------------------
    Fonction:"get_data(id, tentative)";
    @auteur: Lorenzo NADAL SANTA;
- id correspond a l'identifiant du projet;
- tentative correspond au numero de la tentative
la fonction permet de recuperer l'ensemble des re-
sultats de tous les eleves a la tentative en para-
netre;
--------------------------------------------------*/

function process_data(rows) {
    return new Promise(resolve => {
        let k = 0;
        let i = 0;
        let val = 10;
        let count = 0;
        let length = rows.length;
        let tab = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        while (k < length) {
            if (rows[k].note > val ) {
                tab[i] = count;
                i = Math.trunc((rows[k].note - 1) / 10);
                val = ((i + 1) * 10);
                count = 0;
            }
            if (k == length - 1) {
                count = count + 1;
                i = Math.trunc((rows[k].note - 1) / 10);
                tab[i] = count;
            }
            count = count + 1;
            k = k + 1;
        }
        resolve(tab);
    })
}

/*--------------------------------------------------
    Fonction:"process_data(rows)";
    @auteur: Samson MAZEAU, Lorenzo NADAL SANTA;
- rows correspond aux notes obtenues par les eleves
pour un meme projet;
cette fonction permet de compter le nombre d'eleve se
situant dans la tranche de note [k, k + 10], k a valeur
dans [0, 10, 20, 30, 40, 50, 60, 70, 80, 90], elle
retourne ces valeurs dans un tableau de taile 10
ou l'indice correspond a la tranche;
--------------------------------------------------*/

async function get_cursus(courriel) {
    return new Promise(async resolve => {
        let idmodules = await get_all_moduleid();
        let nbmodule = idmodules.length;
        let moduletmp;
        let k = 0;
        let cursus = {};

        while (k < nbmodule) {
            moduletmp = idmodules[k].idmodule;
            modulename = await get_module_name(moduletmp);
            if (modulename !== false) {
                cursus[modulename] = await get_validation_module(moduletmp, courriel);
            }
            k++;
        }
        resolve(cursus);
    });
}

/*--------------------------------------------------
    Fonction:"get_cursus(courriel)";
    @auteur: Lorenzo NADAL SANTA;
- courriel correspond a l'identifiant de l'utilisateur

Cette fonction permet de recuperer l'ensemble des notes
obtenus pour tous les modules de la base de donnees;
--------------------------------------------------*/


function get_validation_module(moduleid, courriel) {
    return new Promise(resolve => {
        let sqlquery = "SELECT * FROM registereduser WHERE userCourriel='" + courriel + "' AND moduleId='" + moduleid + "'";
        let res;
        let nbprojet;

        mysqlConnection.query(sqlquery, async (err, rows, field) => {
            if (err) {
                console.log(err);
                resolve(false);
            }
            else if (typeof (rows[0]) == 'undefined') {
                resolve(0);
            }
            else {
                nbprojet = await get_nb_projet(moduleid)
                res = await note_totale_module(rows, nbprojet);
                resolve(res);
            }
        })
    });
}

/*--------------------------------------------------
    Fonction:"get_validation_module(moduleid, courriel)";
    @auteur: Lorenzo NADAL SANTA;
- moduleid correspond a l'identifiant du projet;
- courriel correspond a l'identifiant de l'utilisateur;

Cette fonction permet d'obtenir le pourcentage de 
completion du module;
--------------------------------------------------*/

function note_totale_module(rows, nbprojet) {
    return new Promise(resolve => {
        
        let nbrNote = rows.length;
        let result = 0;
        let k = 0;
        while (k < nbrNote) {
            result = result + rows[k].note;
            k++;
        }
        result = result / nbprojet;
        resolve(result);
    });
}

/*--------------------------------------------------
    Fonction:"note_totale_module(rows)";
    @auteur: Lorenzo NADAL SANTA;
- rows correspond a l'ensemble de note obtenu par l'eleve

Cette fonction permet d'obtenir l'avancement en 
pourcentage de l'élève dans le module'
--------------------------------------------------*/

function get_all_moduleid() {
    return new Promise(resolve => {
        let sqlquery = "SELECT idmodule FROM module";

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
    });
}

/*--------------------------------------------------
    Fonction:"get_all_moduleid()";
    @auteur: Lorenzo NADAL SANTA;

Cette fonction permet de recuperer l'ensemble des modules;
--------------------------------------------------*/

function get_module_name(moduleid) {
    return new Promise(resolve => {
        let sqlquery = "SELECT nom FROM module WHERE idmodule='" + moduleid + "';"

        mysqlConnection.query(sqlquery, (err, rows, field) => {
            if (err) {
                console.log(err);
            }
            else if (typeof (rows[0]) == 'undefined') {
                resolve(false);
            }
            else {
                resolve(rows[0].nom);
            }
        });
    });
}

/*--------------------------------------------------
    Fonction:"get_module_name(moduleid)";
    @auteur: Lorenzo NADAL SANTA;
-moduleid identifiant du module

Permet de recuperer le nom du module correspondant;
--------------------------------------------------*/

function get_nb_projet(idmodule) {

    return new Promise(resolve => {
        let sqlquery = "SELECT * from projets WHERE moduleId='" + idmodule + "';";

        mysqlConnection.query(sqlquery, (err, rows, field) => {
            if (err) {
                console.log(err)
            }
            else if (typeof (rows[0]) == 'undefined') {
                resolve(1); // A REVOIR 
            }
            else {
                resolve(rows.length)
            }
        });
    });
}
/*--------------------------------------------------
    Fonction:" get_nb_projet(idmodule)";
    @auteur: Lorenzo NADAL SANTA;
-idmodule identifiant du module

Permet de recuperer le nombre de projet dans un module
--------------------------------------------------*/

module.exports.note_totale_module = note_totale_module;
module.exports.get_cursus = get_cursus;
module.exports.get_validation_module = get_validation_module;
module.exports.get_tentative = get_tentative;
module.exports.process_data = process_data;
module.exports.get_data = get_data;
module.exports.unsubscribe = unsubscribe;
module.exports.subscribe = subscribe;
module.exports.get_projets = get_projets;
module.exports.get_registered = get_registered;
module.exports.note_totale_module = note_totale_module;