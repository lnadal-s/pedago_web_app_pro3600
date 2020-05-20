/*--------------------------------------------------
    FILE: connection_db.js
    @auteur: Lorenzo NADAL SANTA;
Les parametres de connexion a la base de donnee 
MySQL;
--------------------------------------------------*/

/*--------- PACKAGES  ---------*/
const mysql = require('mysql');

/*--------- Connection to db  ---------*/
var mysqlConnection = mysql.createConnection(
    {
        host : 'db',
        user : 'mysql',
        password : 'Root1234',
        database  : 'Pro3600',
        port : '3306'
    });
    
mysqlConnection.connect((err) =>
{
    if (!err)
    {
        console.log("Connected to database");
    }
    else if (err)
    {
        console.log("Connection failed :" + err);
        return process.exit(22);
    }
});

module.exports = mysqlConnection;