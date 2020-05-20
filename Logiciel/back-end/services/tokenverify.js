/*--------- PACKAGES  ---------*/
const   jwt = require('jsonwebtoken');

/* DB */
const mysqlConnection = require('../connection_db');

/*--------- Functions  ---------*/

async function verifyToken(req, res, next)
{
    if (!req.headers.authorization)
    {
        return res.status(401).send("Unauthorized request");
    }
    let token = req.headers.authorization.split(' ')[1]; // exctraction du token
    if (token === 'null')
    {
        return res.status(401).send("Unauthorized request");
    }
    let payload = jwt.verify(token, 'secretkey');
    if (!payload)
    {
        return res.status(401).send("Unauthorized request");
    }
    req.courriel = payload.subject;
    req.username = await get_name(req.courriel);
    next();
}

/*--------------------------------------------------
    function verifyToken(req, res, next)
    @auteur: Lorenzo NADAL SANTA;
- req est la requete obtenue suite a la requete du 
front vers le back
- res est la reponse que le back va envoyer

Cete fonction permet de verifier si le token fourni
dans l'entete correspond bien a celui delivree par le
back-end

elle stocke egalement les donnees de l'utilisateur dans
l'objet req
--------------------------------------------------*/

function get_name(courriel)
{
    return new Promise (resolve => {
        let sqlquery = "SELECT * from user WHERE user.courriel='" + courriel + "'";
        
        mysqlConnection.query(sqlquery, (err, rows, fields) =>
        {   
            if (err)
            {
                resolve(null);
                console.log(err);
            }
            else if (typeof(rows[0]) == 'undefined')
            {
                resolve(null);
            }
            else if (!(rows === undefined))
            {
                resolve(rows[0].username);
            }
        });
    });
}

/*--------------------------------------------------
    function get_name(courriel)
    @auteur: Lorenzo NADAL SANTA;
- courriel correspond a l'identifiant de l'utilisateur

Cete fonction permet d'obtenir le nom de l'utilisateur
nous l'utilisons principalement pour nommer les fichiers
recu;
--------------------------------------------------*/

module.exports.verifyToken = verifyToken;