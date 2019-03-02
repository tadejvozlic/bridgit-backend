const mariadb = require('mariadb');
const pool = mariadb.createPool({host: 'mydb.com', user: 'myUser', connectionLimit: 5});
pool.getConnection.then(conn=>{
    
})