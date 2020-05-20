/* TEST UNITAIRE POUR L'OBTENTATION DE LA TOTALE*/
/*--------------------------------------------------
    fichier: test_correction.js;
    @auteur: Samson MAZEAU;
Ce fichier a pour but de lancer les tests unitaires
correspondant a la fonctionnalite de visionnage 
de l'avancement en pourcentage de l'utilisateur
dans le module;

les pre-requis sont d'avoir le back-end et la base
de donnee en fonctionnement;
--------------------------------------------------*/
const express = require('express');
const router = express.Router();

/* PRE - REQUIS */

const ProjetService = require('../services/ProjetService.js');


/* Objets à créer pour tester la fonction note_totale_module() */

data1 = [ { note: 10 },

   { note: 67 },
   
   { note: 90 }, ]

nbProjet1 = 6;

data2 = [ { note: 100 },

    { note: 100 },
    
    { note: 100 }, ]

data3 = [ { note: 0 },

    { note: 0 },
        
    { note: 0 }, ]




/* TEST */

test_unitaire_note_totale_module();

async function test_unitaire_note_totale_module()

{
    console.log("-------------- Lancement du test 1 -------------- ");
    console.log();
    console.log("Voici les notes obtenues par l'élève pour 3 projets dans un module précis:")
    console.log()
    console.log(this.data1);
    console.log()
    console.log("Admettons que le nombre total de projet dans ce module est:")
    console.log()
    console.log(this.nbProjet1)
    console.log()
    console.log("Voici le résultat (en pourcentage) que la fonction renvoit:")    
    databis1 = await ProjetService.note_totale_module(this.data1, this.nbProjet1);
    console.log()
    console.log(this.databis1 + " %")
    console.log()
    console.log("Nous voyons que l'avancement de l'élève dans ce module ")
    console.log("lorsqu'il a obtenu 2 notes > 50% et 1 note < 50%, est inférieur à 50% ")
    console.log()
    console.log("-------------- Lancement du test 2 -------------- ");
    console.log();
    console.log("Voici les notes obtenues par l'élève pour 3 projets dans un module précis:")
    console.log()
    console.log(this.data2);
    console.log()
    console.log("Admettons que le nombre total de projet dans ce module reste le même et est égal à:")
    console.log()
    console.log(this.nbProjet1)
    console.log()
    console.log("Voici le résultat (en pourcentage) que la fonction renvoit:")    
    databis2 = await ProjetService.note_totale_module(this.data2, this.nbProjet1);
    console.log()
    console.log(this.databis2 + " %")
    console.log()
    console.log("nous voyons que l'avancement de l'élève lorsque toutes ses notes sont égales à 100%")
    console.log("est exactement de 50% car il a réalisé et complètement validé 3 projets sur les 6 disponibles dans ce module")
    console.log()
    console.log("-------------- Lancement du test 3 -------------- ");
    console.log();
    console.log("Voici les notes obtenues par l'élève pour 3 projets dans un module précis:")
    console.log()
    console.log(this.data3);
    console.log()
    console.log("Admettons que le nombre total de projet dans ce module reste le même et est égal à:")
    console.log()
    console.log(this.nbProjet1)
    console.log()
    console.log("Voici le résultat (en pourcentage) que la fonction:")    
    databis3 = await ProjetService.note_totale_module(this.data3, this.nbProjet1);
    console.log()
    console.log(this.databis3 + " %")
    console.log()
    console.log("Nous voyons que l'avancement de l'élève lorsque toutes ses notes sont égales à 0%")
    console.log("est exactement de 0% car il n'a pas validé les 3 projets qu'il a réalisé sur les 6 disponibles dans ce module")
    console.log()
    console.log("-------------- Fin du test -------------- ");
    console.log()
    return(process.exit(22));
}




module.exports = router;
