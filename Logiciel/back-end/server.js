
/*--------- PACKAGES  ---------*/
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

/*--------- APP ---------*/
const PORT = 3000;
const api = require('./routes/api');
const settings = require('./services/SettingsService');
const projet = require('./services/correction/CorrectionService');
const app = express();
app.use(cors());

/*--------- DATABASE Connection ---------*/
const mysqlConnection = require('./connection_db');

/*--------- RULES ---------*/
app.use(bodyParser.json());
app.use('/api', api);
app.use('/settings', settings);
app.use('/projet', projet.router);

app.get('/', (req, res) =>
{
    res.send('hello from server');
});

app.listen(PORT, function(){
    console.log('server running on localhost' + PORT);
});