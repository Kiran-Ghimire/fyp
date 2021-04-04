const db = require("../database");

const router = require("express").Router();

const deleteQuery = "DELETE FROM user WHERE User_ID =?";

module.exports = router.post("/deleteAccount", (req, res) => {
  const { id } = req.body;
  console.log(id);

  db.query(deleteQuery, id, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});
