/* TEST UNITAIRE POUR l'ENREGISTREMENT DES PTS */
/*--------------------------------------------------
    fichier: test_correction.js;
    @auteur: Lorenzo NADAL SANTA;
Ce fichier a pour but de lancer les tests unitaires
correspondant a la fonctionnalite d'ajout ;

les pre-requis sont d'avoir le back-end et la base
de donnee en fonctionnement;
--------------------------------------------------*/
const express = require('express');
const router = express.Router();

/* PRE - REQUIS */

const CorrectionService = require('../services/correction/CorrectionService');
const mysqlConnection = require('../connection_db');

/* TEST */

test_unitaire_set_pts();

async function test_unitaire_set_pts()
{
    console.log("----AFFICHAGE DES DONNNES DE L'UTILISATEUR AVANT TEST-----");
    let courriel = "2020@2020.com"; //mettre un utilisateur specifique
    let data = await get_data(courriel);
    let exp;
    exp = data[0].exp;
    console.log(data[0]);
    console.log()
    console.log("-------------- lancement du test 1 -------------- ");
    console.log();
    console.log("Test 1 avec note > old_note");
    get = await CorrectionService.set_pts(courriel, 80, 60)
    data = await get_data(courriel);
    console.log("L'experience doit augmenter de 20 pts")
    console.log(data[0]);
    console.log();
    console.log("-------------- lancement du test 2 -------------- ");
    console.log();
    console.log("Test avec note < old_note");
    await CorrectionService.set_pts(courriel, 60, 80);
    data = await get_data(courriel);
    console.log("L'experience ne doit pas changer")
    console.log(data[0]);
    console.log()
    console.log("-------------- lancement du test 3 -------------- ");
    console.log();
    console.log("Test avec note == old_note");
    await CorrectionService.set_pts(courriel, 80, 80);
    data = await get_data(courriel);
    console.log("L'experience ne doit pas changer")
    console.log(data[0]);
    console.log()
    console.log("Test avec note < 0");
    await CorrectionService.set_pts(courriel, -80, 80);
    data = await get_data(courriel);
    console.log("L'experience ne doit pas changer")
    console.log(data[0]);
    console.log()
    return(process.exit(22));
};

/* UTILITIES */

function get_data(courriel) {
    return new Promise(resolve => {

        let sqlquery = "SELECT * from user WHERE courriel='" + courriel + "';";
        mysqlConnection.query(sqlquery, async (err, rows, fields) => {
            if (err) {
                console.log(err);
                resolve(false);
            }
            else {
                resolve(rows);
            }
        })
    })
}
module.exports = router;