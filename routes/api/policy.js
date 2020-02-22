const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const PolicyDetails = require("../../models/PolicyDetails");
const UserDetails = require("../../models/UserDetails");
const UserPolicy = require("../../models/UserPolicy");

//get all polocies
router.get("/policyDetails", auth, async (req, res) => {
  try {
    const policyDetails = await PolicyDetails.find();
    res.json(policyDetails);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

//to post a policy detail
router.post("/policyDetails", auth, async (req, res) => {
  try {
    const newPolicyDetail = new PolicyDetails({
      policyName: req.body.policyName,
      code: req.body.code,
      description: req.body.description,
      status: req.body.status
    });
    const policyDetail = await newPolicyDetail.save();
    res.json(policyDetail);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//get all policies of logged in user
router.get("/userDetails/:id", async (req, res) => {
  console.log(req.params.id);
  //   try {
  //     const userDetails = await UserDetails.findOne({
  //       email: req.params.emailId
  //     });
  //     res.json(userDetails);
  //   } catch (err) {
  //     console.log(err.message);
  //     res.status(500).send("server error");
  //   }
});

//to post a user detail for a user
router.post("/userDetails", auth, async (req, res) => {
  try {
    const newUserDetail = new UserDetails({
      email: req.body.email,
      Gender: req.body.Gender,
      DateOfBirth: req.body.DateOfBirth,
      contactNumber: req.body.contactNumber,
      policyDetails: req.body.policyDetails
    });
    const userDetail = await newUserDetail.save();
    res.json(userDetail);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//to add a policy detail for a user
router.post("/add", auth, async (req, res) => {
  try {
    const { email, code } = req.body;
    const policyDetail = await PolicyDetails.find({ code: code });

    const userDetail = await UserDetails.find({ email: email });

    const newUserPolicy = await new UserPolicy({
      user: userDetail,
      policyDetails: policyDetail
    });

    const userPolicy = newUserPolicy.save();
    res.json(userPolicy);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
