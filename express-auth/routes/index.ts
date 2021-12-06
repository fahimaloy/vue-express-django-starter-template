// // const express = require('express')
// import express from 'express'
// const router = express.Router();
// router.get('/',(req,res,next) => {
//     res.json({test:"test"});
// });

const tutorials = require("../controller/user.controller");
const loginController = require("../controller/login-controller")
const router = require("express").Router();

router.post("/login", loginController.login);
// Create a new Tutorial
router.post("/", tutorials.create);

// Retrieve all Tutorials
router.get("/", tutorials.findAll);

// Retrieve all published Tutorials
// router.get("/published", tutorials.findAllPublished);

// Retrieve a single Tutorial with id
// router.get("/:id", tutorials.findOne);

// Update a Tutorial with id
router.put("/id/", tutorials.update);

// Delete a Tutorial with id
router.delete("/id/:id", tutorials.delete);

router.get("/logout",(req,res)=>{
    res.clearCookie("jwt").send("You have Successfully Logged Out")
})

module.exports = router;