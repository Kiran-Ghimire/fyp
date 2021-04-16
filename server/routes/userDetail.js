const e = require("express");
const db = require("../database");

const router = require("express").Router();

const dbQuery = "SELECT * FROM user ";

module.exports = router.get("/admin/userDetail", (req, res) => {
  const email = req.body.email;
  db.query(dbQuery, (err, result) => {
    if (err) {
      res.json({ err: err });
    } else {
      res.json({ result: result });
    }
  });
});
