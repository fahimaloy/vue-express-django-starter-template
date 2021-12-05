import mysql from 'mysql'
const dbConf = require('./db.conf.ts')
const db = mysql.createConnection({
    host: dbConf.HOST,
    user : dbConf.USER,
    password: dbConf.PASS,
    database:dbConf.DB
});



module.exports = db ;