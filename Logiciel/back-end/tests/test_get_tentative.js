/* TEST UNITAIRE POUR l'OBTENTION DES TENTATIVES */
/*--------------------------------------------------
    fichier: test_get_tentative.js;
    @auteur: Lorenzo NADAL SANTA;

les pre-requis sont d'avoir le back-end et la base
de donnee en fonctionnement;

Cette fonction doit toujours retourner la tentative max + 1
pour pouvoir indexer correctement la tentative suivante en cours;
--------------------------------------------------*/
const express = require('express');
const router = express.Router();

/* PRE - REQUIS */

const ProjetService = require('../services/ProjetService');
const mysqlConnection = require('../connection_db');

/* TEST */

test_unitaire_get_tentative();

async function test_unitaire_get_tentative()
{
    console.log("----AFFICHAGE DES DONNNES DE L'UTILISATEUR AVANT TEST-----");
    let courriel = "2020@2020.com";
    let data = await get_all_tentative(1, courriel);
    console.log(data);
    console.log()
    console.log("-------------- lancement du test 1 -------------- ");
    console.log();
    console.log("Test avec un projet ou l'utilisateur a deja eu plusieurs tentatives");
    get = await ProjetService.get_tentative(1, courriel);
    console.log("La tentative doit etre de + 1 que l'attribut tentative maximum ")
    console.log("resultat attendu: 3");
    console.log("resultat obtenu: " + get);
    console.log();
    console.log("-------------- lancement du test 2 -------------- ");
    console.log();
    console.log("Test avec un projet ou l'utilisateur n'a jamais ete corrige");
    get = await ProjetService.get_tentative(3, courriel);
    console.log("resultat attendu: 1");
    console.log("resultat obtenu: " + get);
    console.log()
    return(process.exit(22));
};

/* UTILITIES */

function get_all_tentative(id, courriel) {
    return new Promise(resolve => {

        let sqlquery = "SELECT tentative FROM depots WHERE projetid='" + id + "' AND courriel='" + courriel + "';";
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