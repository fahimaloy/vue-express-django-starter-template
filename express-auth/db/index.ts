import mysql from 'mysql'
require('dotenv').config()
const db = mysql.createConnection({
    host: process.env.HOST,
    user : process.env.USR,
    password: process.env.PASS,
    database: process.env.DB
});



module.exports = db ;