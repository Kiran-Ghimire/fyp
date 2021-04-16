const db = require("../database");

const router = require("express").Router();
const moment = require("moment");

// const checkStaff = "SELECT * FROM staff WHERE user_id=?";

const appointmentQuery =
  "INSERT INTO appointments (User_ID,services_id, date, time, vehicle, vehicle_name, vehicle_num) VALUES (?,?,?,?,?,?,?)";

module.exports = router.post("/bookAppointment", (req, res) => {
  const {
    serviceId,
    userId,
    time,
    date,
    vehicle,
    vehicleName,
    vehicleNumber,
  } = req.body;
  console.log(time);
  let booked;
  if (time.length > 0) {
    db.query(
      "SELECT services_id,date,time FROM appointments",
      (err, result) => {
        result.map((item) => {
          if (
            moment(item.date).format("YYYY-MM-DD") ===
              moment(date).format("YYYY-MM-DD") &&
            item.time === time
          ) {
            booked = true;
          }
          // } else {

          // }
        });
        if (!booked === true) {
          db.query(
            appointmentQuery,
            [
              userId,
              serviceId,
              date,
              time,
              vehicle,
              vehicleName,
              vehicleNumber,
            ],
            (err, result) => {
              console.log(err);
              if (!err) {
                res.json({
                  message: "Appointment is booked.",
                  type: "success",
                  result: result,
                });
              }
            }
          );
        } else {
          res.json({
            message:
              "Sorry! Appointment is already booked for the selected date",
            type: "error",
          });
        }
      }
    );
  } else {
    res.json({ message: "Please fill all the fields", type: "info" });
  }
});
