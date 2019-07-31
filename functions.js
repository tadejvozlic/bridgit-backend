// const db = require('./db_connection.js');
const uuid = require('uuidv4');

var connectDb = function(){

}
var move = function(player, id1,id2){

}
var gameOver = function() {

}
var newGame = function() {
    gameInfo =  {
        id: uuid(),
        full: false
    }
    // thid.db.query
    return gameInfo;
}
var joinGame = function() {

}
var postGameResults = function() {

}
var getUuid = function() {
    return uuid();
}

module.exports = {
    move: move,
    newGame: newGame,
    gameOver: gameOver,
    postGameResults: postGameResults,
    connectDb: connectDb,
    getUuid: getUuid,
}