const router = require("express").Router();
const multer = require("multer");
const path = require("path");

const db = require("../database");
const fs = require("fs");

const withoutImageQuery =
  "UPDATE services SET services_name=?,services_price=?,services_description=? WHERE services_id =?";

const DIR = "../client/src/images/services";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage }).single("image");

module.exports = router.post("/updateService", upload, (req, res) => {
  const {
    services_name,
    services_price,
    services_description,
    services_id,
    image,
  } = req.body;
  console.log(req.body);
  try {
    // if (image !== "old") {
    //   // console.log(req.file.filename);
    //   let image_name = req.file.filename;
    //   db.query(getPrevImageQuery, id, (err, result) => {
    //     [prevImage] = result.map((item) => item.image);
    //     if (!err) {
    //       fs.unlink(`../client/src/images/services/${prevImage}`, (err) => {
    //         if (!err) {
    //           db.query(
    //             withImageQuery,
    //             [name, price, description, image_name, id],
    //             (err, result) => {
    //               if (err) {
    //                 console.log(err);
    //                 res.json({ message: "Error Occurred", type: "error" });
    //               } else {
    //                 res.json({
    //                   message: "Successfully Updated",
    //                   type: "success",
    //                   image: image_name,
    //                   id: id,
    //                 });
    //               }
    //             }
    //           );
    //         }
    //       });
    //     }
    //   });
    // } else {
    db.query(
      withoutImageQuery,
      [services_name, services_price, services_description, services_id],
      (err, result) => {
        if (err) {
          res.json({ message: "Error Occurred", type: "error" });
        } else {
          res.json({
            message: "Successfully Updated",
            type: "success",
            result: result,
          });
        }
      }
    );
    // }
  } catch (err) {
    console.log(err);
  }
});
