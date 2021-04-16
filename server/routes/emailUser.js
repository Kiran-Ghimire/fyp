const router = require("express").Router();
const transporter = require("../nodemailerSetup");
const moment = require("moment");

module.exports = router.post("/confirmation", (req, res) => {
  const { email, bookingCart } = req.body;
  console.log(bookingCart);
  let bookingDetails =
    bookingCart?.length > 0
      ? bookingCart.map(
          (item) =>
            `Booked ${item.name} with  on ${moment(item.date).format(
              "YYYY_MM_DD"
            )} at ${item.time} \n`
        )
      : "You have no current bookings.";

  let reply = `Thankyou for choosing Us.

  
  
  Your Bookings:
  ${bookingDetails}
  `;

  let mail = {
    from: `Hamro Workshop ${email}`,
    to: `karkinishant14@gmail.com`,
    subject: `Thankyou for connecting with us.`,
    text: reply,
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: "failed",
        type: "error",
        message: "An Error Occurred.",
      });
    } else {
      res.json({
        type: "success",
        message: "Mail sent.",
        reply: reply,
      });
    }
  });
});
