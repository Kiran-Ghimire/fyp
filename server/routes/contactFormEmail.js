const router = require("express").Router();
const transporter = require("../nodemailerSetup");

module.exports = router.post("/contactForm", (req, res) => {
  const { name, phone, email, message } = req.body.values;
  const { subject } = req.body;
  console.log(req.body);

  let reply = `
  Name: ${name}
  Phone: ${phone}
  Email: ${email}
  Message: ${message}`;

  let mail = {
    from: `${name} <${email}>`,
    to: process.env.EMAIL,
    subject: `${subject} ${email}`,
    text: reply,
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: "fail",
        type: "error",
        message: "An Error Occurred.",
      });
    } else {
      res.json({
        type: "success",
        message: "Thankyou for your feedback.",
      });
    }
  });
});
