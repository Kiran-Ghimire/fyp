const router = require("express").Router();
const db = require("../database");

module.exports = router.post("/demoteAdmin", (req, res) => {
  const id = req.body.id;
  const role = "C";
  db.query(
    "UPDATE user SET role=? WHERE User_ID =?",
    [role, id],
    (err, result) => {
      if (err) {
        res.json({ message: "Error Occurred", type: "error" });
      } else {
        res.json({ message: "Demote Successful", type: "success" });
      }
    }
  );
});
