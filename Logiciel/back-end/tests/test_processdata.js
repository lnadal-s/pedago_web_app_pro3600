/* TEST UNITAIRE POUR lE TRAITEMENT DES STATISTIQUES*/
/*--------------------------------------------------
    fichier: test_correction.js;
    @auteur: Samson MAZEAU;
Ce fichier a pour but de lancer les tests unitaires
correspondant a la fonctionnalite du triage des 
notes des projets;

les pre-requis sont d'avoir le back-end et la base
de donnee en fonctionnement;
--------------------------------------------------*/
const express = require('express');
const router = express.Router();

/* PRE - REQUIS */

const ProjetService = require('../services/ProjetService.js');


/* Objets à créer pour tester la fonction process_data() */

    data1 = [ { note: 0 },
        
         { note: 6 },
        
        { note: 12 },
        
        { note: 13 },
        
        { note: 15 },
        
        { note: 45 },
        
        { note: 56 },
        
        { note: 67 },
        
        { note: 87 },
        
        { note: 90 },
        
        { note: 99 },
        
        { note: 100 } ]

    data2 = [ 
    
        { note: 6 },
           
    
        { note: 12 },
           
    
        { note: 23 },
           
    
        { note: 35 },
           
    
        { note: 45 },
           
    
        { note: 56 },
           
    
        { note: 67 },
           
    
        { note: 77 },
           
    
        { note: 85 },
           
    
        { note: 94 }, ]

    
    data3 = [ { note: 0 },
           
        { note: 100 } ]

/* TEST */

test_unitaire_process_data();

async function test_unitaire_process_data()
{
    console.log("-------------- Lancement du test 1 -------------- ");
    console.log();
    console.log("Voici les données que nous traitons: ")
    console.log()
    console.log(this.data1);
    console.log()
    databis1 = await ProjetService.process_data(this.data1); //notes contabilisées dans le tableau
    console.log()
    console.log("Voici le tableau que la fonction renvoit :")
    console.log()
    console.log(this.databis1)
    console.log()
    console.log("-------------- Lancement du test 2 -------------- ");
    console.log();
    console.log("Voici les données que nous traitons: ")
    console.log()
    databis2 = await ProjetService.process_data(this.data2); //notes contabilisées dans le tableau
    console.log()
    console.log("Le tableau ne doit contenir que des 1: ")
    console.log()
    console.log(this.databis2);
    console.log()
    console.log("-------------- Lancement du test 3 -------------- ");
    console.log();
    console.log("Voici les données que nous traitons: ")
    console.log()
    databis3 = await ProjetService.process_data(this.data3); //notes contabilisées dans le tableau
    console.log()
    console.log("Le tableau doit contenir un 1 à l'indice 0 et 9 et doit contenir des 0 partout ailleurs :")
    console.log()
    console.log(this.databis3);
    console.log();
    console.log("-------------- Fin du test -------------- ");
    console.log();
    return(process.exit(22));
}


module.exports = router;