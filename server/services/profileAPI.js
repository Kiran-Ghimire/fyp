const db = require("../database");
const fs = require("fs");

const dbQueryPOST = "UPDATE users SET image=?";
const dbSelectQuery = "SELECT image from user WHERE USER_ID=?";

const dbUserDetailsQuery = "SELECT * FROM user WHERE USER_ID=?";

module.exports = profilePOST = (req, res) => {
  const id = req.body.id;
  const { filename } = req.file;

  db.query(dbSelectQuery, id, (err, result) => {
    if (result.length > 0) {
      fs.unlink(`../client/src/images/profile/${image}`, (err) =>
        res.send(err)
      );
    } else {
      db.query(dbQueryPOST, filename, (err, result) => {
        if (!err) {
          db.query(dbUserDetailsQuery, id, (err, response) => {
            if (!err) {
              res.json({ result: response });
            }
          });
        }
      });
    }
  });
};
