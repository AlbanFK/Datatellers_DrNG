const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const appointmentRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records.
appointmentRoutes.route("/appointment").get(function (req, res) {
 let db_connect = dbo.getDb("DrNG");
 db_connect
   .collection("appointment")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});

// This section will help you create a new appointment.
appointmentRoutes.route("/appointment/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   unique_code: req.body.unique_code,
   name: req.body.name,
   address: req.body.address,
   city: req.body.city,
   phone: req.body.phone,
   email: req.body.email,
   age: req.body.age,
   sex: req.body.sex,
   request_date: req.body.request_date,
   appointment_date: req.body.appointment_date,
   appointment_time: req.body.appointment_time,
   status: req.body.status,
   comment_before: req.body.comment_before,
   comment_after: req.body.comment_after,
 };
 db_connect.collection("appointment").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.sendStatus(200)
   response.json(res);
 });
});

module.exports = appointmentRoutes;