const express = require('express');
const app = express();
const functions = require('./functions.js');
const bodyParser = require('body-parser');
const router = express.Router();
const config = require('./config.json');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
app.use('/'+config.prefix+'api', router);

router.get('/', (req, res) => res.send('Hello World!'))
router.get('/newGame', (req, res) =>{
    console.log("INFORMATION GOT!")
 res.send('starting new Game')
 })


app.listen(config.server_port, console.log("Listening o port", config.server_port));