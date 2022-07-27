import { hashPwd } from "./hashingPass";

const UsersLogin = require('../models/login.model');

// Create and Save a new Tutorial
exports.login = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
      else{
        let hashedPass = hashPwd(req.body.password)
        // Create a User
        const user = new UsersLogin({
          username: req.body.username,
          password: hashedPass,
        });
        
        // Save Tutorial in the database
        UsersLogin.login(user, (err, data) => {
          if (err)
          res.status(500).send({
            message:
            err.message || "Some error occurred while creating the User."
          });
          else{ 
            res.cookie('jwt', data[0].jwt).send(data);
            // res.send(data)
          };
        });
      }
};

