/* TEST UNITAIRE POUR l'OBTENTION DES TENTATIVES */
/*--------------------------------------------------
    fichier: test_subscribe.js;
    @auteur: Lorenzo NADAL SANTA;

les pre-requis sont d'avoir le back-end et la base
de donnee en fonctionnement;

Cette fonction permet a un eleve de s'inscrire a un projet
--------------------------------------------------*/
const express = require('express');
const router = express.Router();

/* PRE - REQUIS */

const ProjetService = require('../services/ProjetService');
const mysqlConnection = require('../connection_db');

/* TEST */

test_unitaire_subscribe();

async function test_unitaire_subscribe()
{
    console.log("----AFFICHAGE DES DONNNES DE L'UTILISATEUR AVANT TEST-----");
    let courriel = "test@tst.com";
    let data = await get_table_registereduser(courriel);
    console.log("resultat attendu: []");
    console.log("resultat obtenu:");
    console.log(data);
    console.log()
    console.log("-------------- lancement du test 1 -------------- ");
    console.log();
    console.log("Inscription a un projet id: 1");
    get = await ProjetService.subscribe(1, courriel);
    data = await get_table_registereduser(courriel);
    console.log("resultat obtenu:");
    console.log(data);
    console.log();
    console.log("-------------- lancement du test 2 -------------- ");
    console.log();
    console.log("inscription a deux projets supplementaires");
    get = await ProjetService.subscribe(2, courriel);
    get = await ProjetService.subscribe(3, courriel);
    data = await get_table_registereduser(courriel);
    console.log();
    console.log("resultat obtenu:");
    console.log(data);
    console.log();
    console.log("-------------- lancement du test 3 -------------- ");
    console.log();
    console.log("inscription a un projet ou on est deja inscrit");
    console.log();
    console.log("resultat obtenu:");
    get = await ProjetService.subscribe(2, courriel);
    data = await get_table_registereduser(courriel);
    console.log(data);
    await ProjetService.unsubscribe(1, courriel); // Desinscription afin de pouvoir reproduire le test
    await ProjetService.unsubscribe(2, courriel);
    await ProjetService.unsubscribe(3, courriel);
    return(process.exit(22));
};

/* UTILITIES */

function get_table_registereduser(courriel) {
    return new Promise(resolve => {
        let sqlquery = "SELECT * FROM registereduser WHERE userCourriel='" + courriel + "';";
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