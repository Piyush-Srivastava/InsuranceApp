const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const PolicyDetails = require("../../models/PolicyDetails");
const UserDetails = require("../../models/UserDetails");
const UserPolicy = require("../../models/UserPolicy");

//get all policies of logged in user
router.get("/userDetails", auth, async (req, res) => {
  try {
    const userDetails = await UserDetails.findOne({
      email: req.query.email
    });

    return res.json(userDetails);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

router.get("/userDetailsByToken", async (req, res) => {
  try {
    const jwtToken = req.header("x-auth-token");
    const decoded = jwt.verify(jwtToken, config.get("jwtSecret"));
    let userId = decoded.user.id;
    const userDetails = await UserDetails.findOne({ _id: userId });

    return res.json(userDetails);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});
module.exports = router;
