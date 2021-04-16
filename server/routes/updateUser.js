const router = require("express").Router();
const db = require("../database");

const updateData = "UPDATE user SET User_Name=?, phone=? WHERE User_ID=?";

module.exports = router.post("/updateUser", (req, res) => {
  const id = req.body.id;
  const { Username, phone } = req.body.values;

  db.query(updateData, [Username, phone, id], (err, result) => {
    if (err) {
      console.log(err);
      res.json({ message: "Error Occurred", type: "error" });
    } else {
      res.json({ message: "Successfully Updated", type: "success" });
    }
  });
});
