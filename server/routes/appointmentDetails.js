const router = require("express").Router();
const db = require("../database");

module.exports = router.get("/getAppointment", (req, res) => {
  db.query(
    "SELECT appointments.appointment_id, user.User_ID, user.User_Name as client,services.services_id, services.image as image,services.services_name as servicesName,services.services_price as servicesPrice, date, time FROM appointments JOIN services ON appointments.services_id = services.services_id JOIN user ON appointments.User_ID = user.User_ID ",
    (err, result) => {
      if (!err) {
        res.json({ result: result });
      }
    }
  );
});

module.exports = router.post("/getAppointment", (req, res) => {
  const id = req.body.id;

  db.query("SELECT * FROM appointments WHERE User_ID=? ", id, (err, result) => {
    console.log(result);
    console.log(err);
  });
});
