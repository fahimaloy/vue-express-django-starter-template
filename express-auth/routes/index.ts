// // const express = require('express')
// import express from 'express'
// const router = express.Router();
// router.get('/',(req,res,next) => {
//     res.json({test:"test"});
// });
const migrate = require("../db/migration")
const user = require("../controller/user.controller");
const loginController = require("../controller/login-controller")
const router = require("express").Router();
const isAuth = require('../controller/isAuthenticated.controller')
router.post("/login", loginController.login);
// Create a new Tutorial
router.post("/register", user.create);

// Retrieve all user
router.get("/", user.findAll);


router.put("/id/", isAuth ,user.update);

router.delete("/id/:id", user.delete);

router.get("/logout",(req,res)=>{
    res.clearCookie("jwt").send("You have Successfully Logged Out")
})
router.post("/migrate_table", migrate.create_table);
router.delete("/migrate_table", migrate.delete_table);
module.exports = router;