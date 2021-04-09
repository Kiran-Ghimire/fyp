const db = require("../database");

const router = require("express").Router();

const deleteQuery = "DELETE FROM appointments WHERE appointment_id =?";

module.exports = router.post("/deleteCart", (req, res) => {
  const { id } = req.body;
  console.log(req.body);

  db.query(deleteQuery, id, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});
