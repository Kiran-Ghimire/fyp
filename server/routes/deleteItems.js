const router = require("express").Router();
const db = require("../database");
const fs = require("fs");

const deleteServiceQuery = "DELETE FROM services WHERE services_id = ?";


module.exports = router.post("/deleteService", (req, res) => {
  const { services_id, services_name, image } = req.body.items;
  db.query(deleteServiceQuery, services_id, (err, result) => {
    err && res.json({ message: `Failed to delete ${services_name} data` });
    if (!err) {
      result &&
        fs.unlink(`../client/src/images/services/${image}`, (err) => {
          if (err) {
            res.json(err);
          } else {
            res.json({
              message: `${services_name} is successfully removed from the database.`,
            });
          }
        });
    }
  });
});


