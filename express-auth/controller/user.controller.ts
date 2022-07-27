import { hashPwd } from "./hashingPass";

const Users = require('../models/user.model');

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  else {
    let hashedPass = hashPwd(req.body.password)
    // Create a User
    const user = new Users({
      username: req.body.username,
      password: hashedPass,
      fullname: req.body.fullname,
      user_type:req.body.user_type
    });
    Users.usernameExists(user.username,(err,data)=>{
      if(err){
        res.status(500).send({
          message:
            err.message || "Something Happened While Checking Username"
        });
      }else if(data){
        res.send({
          message:
            `The Username: ${user.username} already exists.Try something Different`
        });
      }else if(!data){

        Users.create(user, (err, data) => {
          if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the User."
            });
          else res.send(data);
        });
      }
      })
  }

}
// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
  const fullname = req.query.fullname;

  Users.getAll(fullname, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};


// Update a Tutorial identified by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }


  let hashedPass = hashPwd(req.body.password)
  const user = new Users({
    username: req.body.username,
    password: hashedPass,
    fullname: req.body.fullname
  });
  Users.updateById(
    req.id,
    new Users(user),
    (err, data) => {
      console.log(req.id)
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User with id " + req.params.id
          });
        }
      } else {

        res.send(data)
      };
    }
  );

};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  Users.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with id " + req.params.id
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};

