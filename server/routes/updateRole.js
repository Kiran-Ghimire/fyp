const db = require("../database");

const router = require("express").Router();

const updateQuery = "UPDATE user SET role = ? WHERE User_ID = ?";

const checkQuery = "SELECT * FROM staff WHERE user_id=?";

module.exports = router.post("/updateRole", (req, res) => {
  const { id, role } = req.body;
  console.log(req.body);

  db.query(updateQuery, [role, id], (err, result) => {
    if (!err) {
      res.json({
        message: "Role Successfully Updated",
        type: "success",
        result: result,
      });
    }
    // db.query(
    //   "SELECT *  FROM staff JOIN users ON staff.user_id = users.user_id",
    //   (err, result) => {
    //     console.log(result);
    //     console.log(err);
    //   }
    // );
  });
});
