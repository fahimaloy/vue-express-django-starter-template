const sqllogin = require("../db/index");
const jwt = require('jsonwebtoken')
require('dotenv')
// constructor
const User = function(user) {
  this.username = user.username;
  this.password = user.password;
};



User.login = (user, result) => {
  sqllogin.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [user.username,user.password],
    (err, res) => {
      try{
        if(!err){
          if(res.length == 1){
              delete res[0].password
                res[0].msg = "Authentication Successfull..... Congratulation "+res[0].fullname+" You have Successfully Logged in"            
                const token = jwt.sign({
                  username:res[0].username,
                  id:res[0].id
                },process.env.JWT_SECRET,
                {
                  expiresIn:'10h'
                })
                res[0].jwt = token
                result(null,res);
            }
            else{
                result(null , "wrong details")
            }
        }
        else if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
      }
      catch{
          console.log(err);
          let mssg:string ='Something Went Wrong'
          result(null, mssg);
          return;
      }
    }
    
    
  );
};




module.exports = User;
