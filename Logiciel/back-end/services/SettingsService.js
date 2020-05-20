/*--------------------------------------------------
    SERVICE: SettingsService
    @auteur: Lorenzo NADAL SANTA;
Permet le traitement des donnees de l'utilisateur;
--------------------------------------------------*/

/* PKG */
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const path = require('path');

/* DB */
const mysqlConnection = require('../connection_db');

/* MODULES */
const tkn = require('../services/tokenverify');

/* MULTER CONFIG */

var multer = require('multer');
var storage = multer.diskStorage({
  destination: './src/photos',
  filename: function (req, file, cb) {
    let nameuploadedfile = req.username + '_' + Date.now() + path.extname(file.originalname);
    cb(null, nameuploadedfile)
    insert_img_url(req.courriel, nameuploadedfile);
  }
})
var upload = multer({ storage: storage });

/*--------------------------------------------------
    var: Multer;
    @auteur: Lorenzo NADAL SANTA;
Multer est une librairie qui permet d'enregistrer un
fichier transmis par http. Ici la configuration
specifie le chemin d'enregistrement du fichier ->
''./src/photos'' et le nom du fichier 
au format : username_date.ext
--------------------------------------------------*/

router.get('/', (req, res) => {
  res.send("from SETTINGS SERVICE");
  res.end();
});

/* SERVICES ENDPOINTS*/

router.post('/upload_img', tkn.verifyToken, upload.single('myFile'), (req, res) => {
  res.status(200).send("done");
})

/*--------------------------------------------------
    post /
    url: http://localhost:3000/settings/upload_img;
    @auteur: Lorenzo NADAL SANTA;
/settings/upload_img
--------------------------------------------------*/


router.post('/update_pwd', tkn.verifyToken, async (req, res) => {
  let data = req.body;
  let oldpwd = data.oldpwd;
  let newpwd_hash = bcrypt.hashSync(data.newpwd, 10);
  let courriel = req.courriel;
  let is_conform = await check_oldpwd(courriel, oldpwd);


  if (is_conform) {
    insert_newpwd(newpwd_hash, courriel);
    res.status(200).send("olwpwd is ok");
  }
  else
  {
    res.status(409).send("wrong old pwd");
  };
});

/*--------------------------------------------------
    post /
    url: http://localhost:3000/settings/update_pwd';
    @auteur: Lorenzo NADAL SANTA;
/settings/update_pwd
--------------------------------------------------*/

/* UTILITIES */

function insert_img_url(courriel, url) {
  let sqlquery = "UPDATE user SET urlimg='" + url + "' WHERE courriel='" + courriel + "';"
  
  console.log(sqlquery);
  mysqlConnection.query(sqlquery, (err, rows, fields) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log("l'utilisateur " + courriel + "a ajoute l'image: " + url);
    }
  });
}

/*--------------------------------------------------
    Fonction: "insert_img_url(courriel, url)";
    @auteur: Lorenzo NADAL SANTA;
- Courriel correspond a l'identifiant utilisateur
- url correspond au nom de l'image
Cette fonction permet de stocker le nom du fichier
dans la base de donnee;
--------------------------------------------------*/

function check_oldpwd(courriel, pwd) {
  return new Promise(resolve => {
    let sqlquery = "SELECT password from user WHERE user.courriel='" + courriel + "';";
    
    mysqlConnection.query(sqlquery, (err, rows, fields) => {
      if (err) {
        console.log(err);
        resolve(false);
      }
      else if (typeof (rows[0]) == 'undefined') {
        resolve(false);
      }
      else {
        bcrypt.compare(pwd, rows[0].password, (error, result) =>
        {
          if (result)
          {
           resolve(true);
          }
          else
          {
            resolve(false);
          }
        });
      }
    });
  });
}

/*--------------------------------------------------
    Fonction: "check_oldpwd(courriel, pwd)";
    @auteur: Lorenzo NADAL SANTA;
- courriel correspond a l'identifiant utilisateur
- pwd est l'ancien mot de passe utilisateur
Cette fonction permet de verifier que le mot de passe
correspond a celui stocker dans la base de donnee;
--------------------------------------------------*/

function insert_newpwd(pwd, courriel)
{
  let sqlquery = "UPDATE user SET password='" + pwd + "' WHERE courriel='" + courriel + "';";

  mysqlConnection.query(sqlquery, (err, rows, fields) => {
    if (err) {
      console.log(err);
    }
  });
};

/*--------------------------------------------------
    Fonction: "insert_newpwd(pwd, courriel)";
    @auteur: Lorenzo NADAL SANTA;
- courriel correspond a l'identifiant utilisateur
- pwd est l'ancien mot de passe utilisateur
Cette fonction permet d'ajouter le nouveau mot de
passe dans la base de donnee;
--------------------------------------------------*/

module.exports = router;