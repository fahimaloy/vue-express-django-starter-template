const sql = require("../db/index");

// constructor
const User = function(user) {
  this.username = user.username;
  this.password = user.password;
  this.fullname = user.fullname;
  this.user_type = user.user_type;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created User: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findById = (id, result) => {
  sql.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

User.getAll = (fullname, result) => {
  let query = "SELECT * FROM users";

  if (fullname) {
    query += ` WHERE fullname LIKE '%${fullname}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tutorials: ", res);
    result(null, res);
  });
};


User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE users SET username = ?, password = ?, fullname = ? WHERE id = ?",
    [user.username, user.password, user.fullname, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

User.remove = (id, result) => {
  sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with id: ", id);
    result(null, res);
  });
};

User.removeAll = result => {
  sql.query("DELETE FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`Succesfully Deleted ${res.affectedRows} Users`);
    result(null, res);
  });
};
User.usernameExists = (username,result)=>{
  sql.query(`SELECT * FROM users WHERE username = ${username}`,(err,res)=>{
    if(err){
      result(null,err)
      return
    }
    else if(res.length){
      result(true,null)
    }else {
      result(false,null)
    }
  })
}
module.exports = User;
