/*--------- PACKAGES  ---------*/
const express = require('express');
const router = express.Router();

/*--------- DATABASE Connection ---------*/
const mysqlConnection = require('../connection_db');

/*--------- Modules and vars ---------*/
var app = express();
const jwt = require('jsonwebtoken');
const path = require('path');

/*--------- SERVICES ---------*/

const tkn = require('../services/tokenverify');
const userService = require('../services/UserService');
const projetService = require('../services/ProjetService');

/*--------- Functions ---------*/
router.get('/', (req, res) => {
    res.send("from API route!");
    res.end();
});

/*--------- Endpoints Login/Register ---------*/

router.post('/register', async (req, res) => {
    let val = await userService.UserSignup(req.body);


    if (val === true) {
        res.status(200).send();
    }
    else {
        res.status(404).send();
    }
});

router.post('/login', async (req, res) => {
    let userdata = req.body;

    let val = await userService.UserLogin(userdata);
    if (val === false) {
        res.status(409).send("Password/Username is not correct");
    }
    else {
        let payload = { subject: userdata.courriel };
        let token = jwt.sign(payload, 'secretkey');
        res.status(200).send({ token });
    }
});

router.get('/check_token', tkn.verifyToken, (req, res) =>
{
    console.log("token check")
    res.status(200).send();
})

/*--------- Endpoints user's data ---------*/

router.get('/user', tkn.verifyToken, async (req, res) => {

    let data = await userService.get_data(req.courriel);

    if (data === false)
    {
        res.status(400).send();
    }
    else
    {
        res.status(200).send(data);
    }

});

router.get("/photos/:idreq", (req, res) => {
    let idreq = req.params.idreq;
    
    res.sendFile(path.resolve("src/photos/" + idreq), (err) => {
        if (err) {
            console.log(err);
        }
    })

});

/*--------- Endpoints Projets ---------*/

router.get('/projets', tkn.verifyToken, async (req, res) => {
    let data = await projetService.get_projets(null, req.courriel);

    if (data === null)
    {
        res.status(404).send();
    }
    else
    {
        res.status(200).send(data);
    }
});

router.get('/projets/:id', tkn.verifyToken, async (req, res) => {
    let data = await projetService.get_projets(req.params.id, req.courriel);

    if (data === null)
    {
        res.status(409).send();
    }
    else
    {
        res.status(200).send(data);
    }
})

router.put('/projets/sub/:id', tkn.verifyToken, async (req, res) => {
    let bool = await projetService.subscribe(req.params.id, req.courriel);

    if (bool === false)
    {
        res.status(409).send({sub: "fail"});
    }
    else
    {
        res.status(200).send({sub: true})
    }
});

router.delete('/projets/sub/:id', tkn.verifyToken, async (req, res) => {
    let bool = await projetService.unsubscribe(req.params.id, req.courriel);

    if (bool === false)
    {
        res.status(409).send({sub: "fail"});
    }
    else
    {
        res.status(200).send({sub: false})
    }
});

router.get('/projets/stats/:id/:tentative', async (req, res) => 
{
    let id = req.params.id;
    let tentative = req.params.tentative;
    courriel = req.courriel;
    let data = await projetService.get_data(id, tentative);
    data = await projetService.process_data(data);

    if (data === false)
    {
        res.status(400).send();
    }
    else 
    {
        res.status(200).send(data);
    }
});
module.exports = router;