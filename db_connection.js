var config = require("./config.json");

const mysql_config = {
    my: config.db.hostname,
    user: config.db.username,
    port: config.db.port,
    password: config.db.password,
    database: config.db.database,
    multipleStatements: true
}
var db = null;

var mysql_connecting = false;
var handleDisconnect = function (ignore_already_connecting) {
  if (mysql_connecting && !ignore_already_connecting) {
    return;
  }
  mysql_connecting = true;

  if (db) {
    db.destroy();
    console.log("Disconnected from mySql");
  }
  db = new require('mysql').createConnection(mysql_config);
  db.connect(function (err) {
    db.query("CREATE DATABASE games", function (err, result) {
        if (err) throw err;
        console.log("Database created");
      });
    if (err) {
      console.log('error', "error when connecting to mysql: " + err);
      setTimeout(function () {
        handleDisconnect(true);
      }, 1000);
    } else {
      mysql_connecting = false;
      
      console.log("Successfully connected to database");
      db.query("SET sql_mode = '';");
    }
  });
  db.on('error', function (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      logger.log("error", "/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
      return handleDisconnect();
    } else if (err.code === "PROTOCOL_ENQUEUE_AFTER_QUIT") {
      logger.log("error", "/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
      return handleDisconnect();
    } else if (err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR") {
      logger.log("error", "/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
      return handleDisconnect();
    } else if (err.code === "PROTOCOL_ENQUEUE_HANDSHAKE_TWICE") {
      logger.log("error", "/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
    } else {
      logger.log("error", "/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
      return handleDisconnect();
    }
  });
}
  var query = function (sql, success_fn, error_fn) {
    db.query(sql, function (error, results) {
      if (error) {
        if (error_fn !== undefined) {
          error_fn(error);
        }
        if (error.fatal || error.sql === undefined) {
          logger.log("error", "connection to mysql lost, (" + error.code + ") reconnecting");
          setTimeout(handleDisconnect, 1000);
        } else {
          logger.log("error", "mysql error while running: " + error.sql + " error was: " + error);
        }
      } else {
        if (success_fn !== undefined) {
          success_fn(results);
        }
      }
    });
  };
  handleDisconnect();
  module.exports = { query }













// const mariadb = require('mariadb');
// const pool = mariadb.createPool({host: 'localhost', user: 'tadej', connectionLimit: 5});

// async function connector() {
//     let conn;
//     try {
//       conn = await pool.getConnection();
//       console.log('Connected!');
//       const createDb = await conn.query('');
//     //   'CREATE TABLE games (
//     //     id INT(50) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
//     //     moves VARCHAR(30) NOT NULL,
//     //     winner int(1) NOT NULL,
//     //     date TIMESTAMP,
//     //     created TIMESTAMP
//     //     )
//       const rows = await conn.query("SELECT 1 as val");
//       console.log(rows); //[ {val: 1}, meta: ... ]
//       const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
//       console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
   
//     } catch (err) {
//       throw err;
//     } finally {
//       if (conn) return conn.end();
//     }
// }