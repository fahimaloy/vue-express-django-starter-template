const db = require("../db/index");

const createTable = (table, result) => {
  db.query(
    `CREATE TABLE ${table.tableName} (${table.sql});`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created Table : ", { res });
      result(null, { res });
    }
  );
};
exports.create_table = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  } else {
    
    const tableData :{tableName:string,sql}= {
        tableName:req.body.tableName,
        sql:req.body.sql
    }

    // Save Tutorial in the database
    createTable(tableData, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User.",
        });
      else {
        res.send({

            message:`Successfully Created Table ${req.body.tableName}`
        })
    }
    });
  }
};


const deleteTable = (table, result) => {
    db.query(
      `DROP TABLE ${table.tableName};`,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
  
        console.log("created Table : ", { res });
        result(null, { res });
      }
    );
  };
  exports.delete_table = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    } else {
      
      const tableData :{tableName:string}= {
          tableName:req.body.tableName,
      }
  
      // Save Tutorial in the database
      deleteTable(tableData, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the User.",
          });
        else {
          res.send({
              message:`Successfully DELETED Table ${req.body.tableName} `
          })
      }
      });
    }
  };
  