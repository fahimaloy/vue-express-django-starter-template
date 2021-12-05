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
        let crypto = require('crypto');
        let hash = crypto.createHash('md5').update(req.body.password).digest('hex');
        // Create a User
        const user = new UsersLogin({
          username: req.body.username,
          password: hash,
        });
        
        // Save Tutorial in the database
        UsersLogin.login(user, (err, data) => {
          if (err)
          res.status(500).send({
            message:
            err.message || "Some error occurred while creating the User."
          });
          else res.send(data);
        });
      }
};

