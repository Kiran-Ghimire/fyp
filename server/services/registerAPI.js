const db = require("../database");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const SelectQuery = "SELECT Email FROM user WHERE email=?";
const InsertQuery =
  "INSERT INTO user (User_Name, Email, Password, role, phone) VALUES (?,?,?,?,?)";

module.exports = (req, res) => {
  const role = "C";
  const { username, email, password, phone } = req.body.values;
  try {
    db.query(SelectQuery, email, (err, result) => {
      if (result.length > 0) {
        res.send({ message: "User already exists.", type: "warning" });
      } else {
        bcrypt.hash(password, saltRounds, (err, hash) => {
          err && res.json({ message: "Error Occurred.", type: "error" });
          if (!err) {
            db.query(
              InsertQuery,
              [username, email, hash, role, phone],
              (err, result) => {
                if (err) {
                  console.log(err);
                } else {
                  res.json({ message: "Successfull" });
                }
              }
            );
          }
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};
