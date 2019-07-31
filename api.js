const express = require('express');
const app = express();
var cors = require('cors');
const functions = require('./functions.js');
const bodyParser = require('body-parser');
const router = express.Router();
const config = require('./config.json');
var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '822640',
  key: 'da78def8fbbc41b098fd',
  secret: 'b34aea8828236653916c',
  cluster: 'eu',
  encrypted: true
});
// CORS
// app.all('/*', function(req, res, next) {
//    res.header("Access-Control-Allow-Origin", "*");
//    res.header("Access-Control-Allow-Headers", "*");
//    next();
//  });
app.use(cors())
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
app.use('/' + config.prefix + 'api', router);

router.get('/', (req, res) => res.send('Hello World!'));
router.post('/newGame', bodyParser.urlencoded({ extended: true }),(req, res) =>{
    pusher.trigger('game-channel', 'new-game', {
      "message": "hello world",
      id: functions.getUuid(),
      password: req.body.password
    });
    let status = functions.newGame();
    console.log(status);
    res.status(500).send(status);
 })
 router.post('/postResults', bodyParser.urlencoded({ extended: true }), (req, res) =>{
    console.log("POST RESULTS!", req.body.moves);
    functions.postGameResults(req.body.moves);
    res.send('posting Game to database');
 })
//  router.post('/stop', bodyParser.urlencoded({ extended: true }), (req, res) => {
//     commands.stop_exchange(req.body.exchange, function (err) {
//         if (err) {
//             console.log("err   " ,err)
//             return res.status(500).send({ text: "Error stopping: " + req.body.exchange, err: err, exchange_name: req.body.exchange, status: true  })
//         }
//         // res.send(get_exchanges_list());
//         // res.writeHead(200, { 'Content-Type': 'text/event-stream' });
//         res.status(200).send({ text: "succesfully stopped: " + req.body.exchange, err: null, exchange_name: req.body.exchange, status: true })
//     });
// });

app.listen(config.server_port, console.log("Listening o port", config.server_port));