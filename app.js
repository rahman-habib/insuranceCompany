const express = require('express');
//const Run = require('run-sdk');
const Insurance = require('./Insurance');
//using Express methods
const app = express();
app.use(express.json({ extended: true }));
require("dotenv").config();
app.use(function (req, res, next) {
    //  SAMPLE res.header("Access-Control-Allow-Origin", "http://192.168.1.100:8025"); // update to match the domain you will make the request from
    res.header("Access-Control-Expose-Headers", "cooljwt");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
  });

// const run = new Run({
//     network: "test",
//     owner: process.env.OWNER,
//     purse: process.env.PURSE,
// })
const newInsurance = new Insurance();
module.exports = newInsurance;
console.log("Insurance smartContract Initialized!");

//Default Route
app.get("/", (req, res) => {
    return res.json({
        BSV_Blockchain: "You are NOT AUTHORIZED! Please leave imidiately.",
    });
});
app.use("/api/insuranceAgent", require('./routes/insuranceAgent'));

app.listen(
    process.env.PORT,
    console.log(`Run at http//localhost:${process.env.PORT}`)
)