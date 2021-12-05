const sqllogin = require("../db/index");

// constructor
const User = function(user) {
  this.username = user.username;
  this.password = user.password;
};



User.login = (user, result) => {
  sqllogin.query(
    "SELECT COUNT(*) AS logincount FROM users WHERE username = ? AND password = ?",
    [user.username,user.password],
    (err, res) => {
        console.log(user.username)
        if(!err){
            let logc:number=res[0].logincount
            if(logc!=0){

                console.log("authentication: Successfull. Hello "+user.username+" .your details ar here", res);
                result(null,user.username+" "+"You have successfully logged in" );
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
    
    
  );
};




module.exports = User;
