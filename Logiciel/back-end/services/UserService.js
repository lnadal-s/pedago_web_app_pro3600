/*--------------------------------------------------
    Fonction: UserService;
    @auteur: Lorenzo NADAL SANTA;
Ce module contient les differentes fonctions liees
au donnees de l'utilisateur. Vous pouvez egalement
en trouver d'autre dans ./services/SettingsService.js
--------------------------------------------------*/

/* PKG */
const mysqlConnection = require('../connection_db');
const bcrypt = require('bcrypt');
const ProjetService = require('./ProjetService');

/* MODULE 

/*  AUTH SERVICES */

async function UserSignup(userdata) {
    return new Promise(resolve => {
        let hash = bcrypt.hashSync(userdata.password, 10);
        let sqlquery = "INSERT INTO user (username, password, courriel) VALUES ('" + userdata.username + "', '" + hash + "', '" + userdata.courriel + "')";

        userdata.password = hash;
        mysqlConnection.query(sqlquery, (err) => {
            if (err) {
                console.log(err);
                resolve(false);
            }
            else {
                resolve(true);
            }
        });
    });
}

/*--------------------------------------------------
    Fonction: UserSignup(userdata)
    @auteur: Lorenzo NADAL SANTA;
- userdata informations de l utilisateur a rentrer 
dans la base de donnee.

Pour crypter le mot de passe on utiliser la librairie
brypt;Cette fonction permet d'enregistrer les donnees
de l'utilisateur dans la base de donnees;
--------------------------------------------------*/

async function UserLogin(userdata) {
    return new Promise(resolve => {
        let sqlquery = "SELECT * from user WHERE user.courriel='" + userdata.courriel + "'";

        mysqlConnection.query(sqlquery, (err, rows, fields) => {
            if (err) {
                console.log(err);
                resolve(false);
            }
            else if (typeof (rows[0]) == 'undefined') {
                resolve(false);
            }
            else if (!(rows === undefined)) {
                bcrypt.compare(userdata.password, rows[0].password, (error, result) => {
                    if (result) {
                        resolve(true);
                    }
                    else {
                        resolve(false);
                    }
                });
            }
        });
    });
}

/*--------------------------------------------------
    Fonction: UserLogin(userdata)
    @auteur: Lorenzo NADAL SANTA;
- userdata informations de l utilisateur a rentrer 
dans la base de donnee.

Verifie que le mot de passe correspond bien a
l'utilisateur dans la base de donnee;
--------------------------------------------------*/

/* DATA SERVICES */

function get_data(courriel) {
    return new Promise(resolve => {

        let sqlquery = "SELECT * from user WHERE courriel='" + courriel + "';";
        mysqlConnection.query(sqlquery, async (err, rows, fields) => {
            if (err) {
                console.log(err);
                resolve(false);
            }
            else {
                rows[0].cursus = await ProjetService.get_cursus(courriel);
                resolve(rows);
            }
        })
    })
}

/*--------------------------------------------------
    Fonction: UserLogin(userdata)
    @auteur: Lorenzo NADAL SANTA;
- userdata informations de l utilisateur a rentrer 
dans la base de donnee.

Verifie que le mot de passe correspond bien a
l'utilisateur dans la base de donnee;
--------------------------------------------------*/

function get_globalexp(courriel) {
    return new Promise(resolve => {
        let sqlquery = "SELECT exp FROM user WHERE courriel='" + courriel + "';";

        mysqlConnection.query(sqlquery, (err, rows, field) => {
            if (err) {
                console.log(err);
                resolve(false);
            }
            else if (typeof (rows[0]) == 'undefined') {
                resolve(false)
            }
            else
            {
                resolve(rows[0].exp)
            }
        });
    })
}

/*--------------------------------------------------
    Fonction: get_globalexp(courriel)
    @auteur: Lorenzo NADAL SANTA;
- courriel correspond a l'identifiant de l'utilisa-
teur;

cette fonction permet d'obtenir l'experience 
globale de l'utilisateur sur l'ensemble des projets;
--------------------------------------------------*/

module.exports.get_globalexp = get_globalexp;
module.exports.get_data = get_data;
module.exports.UserSignup = UserSignup;
module.exports.UserLogin = UserLogin;