const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const nodemailer = require("nodemailer");

const PolicyDetails = require("../../models/PolicyDetails");
const UserDetails = require("../../models/UserDetails");
const UserPolicy = require("../../models/UserPolicy");
const UserClaim = require("../../models/UserClaim");

let transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "b3a13cafa09050",
    pass: "8f052852d3ae8e"
  }
});

//when claim is approved
//reduce policy amount
router.post("/claim/approved", auth, async (req, res) => {
  try {
    const { claimAmount, code, email } = req.body;
    const userDetail = await UserDetails.findOne({ email });

    console.log(userDetail._id);
    const userPolicy = await UserPolicy.findOne({
      user: userDetail._id
    });
    console.log(userPolicy);
    if (userPolicy !== null) {
      userPolicy.policyDetails.forEach(policyDetail => {
        if (policyDetail.code === code) {
          policyDetail.amount >= claimAmount
            ? (policyDetail.amount = policyDetail.amount - claimAmount)
            : res.message("not enough insurance balance");
          userPolicy.save();
        }
      });

      const message = {
        from: "JMD Insurance App", // Sender address
        to: email, // List of recipients
        subject: `Policy Claim for Policy ${code} Approved`, // Subject line
        html: `<p>Hi, Your claim for policy ${code} has been approved.` // Plain text body
      };
      transport.sendMail(message, function(err, info) {
        if (err) {
          console.log(err);
        } else {
          console.log(info);
          return res.json(info);
        }
      });
      return res.json(userPolicy);
    } else {
      return res.send("no such policy for this user");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});
//@route  POST api/auth//login
// @desc   Authenticate user and get request
// @access Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // check if user exist
      let user = await UserDetails.findOne({ email });

      if (!user) {
        res.status(400).json({ errors: [{ msg: "Invalid credentials " }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      // return jsonwebtoken
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) {
            throw err;
          } else {
            res.json({ token, user });
          }
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

//get all policies
router.get("/policyDetails", auth, async (req, res) => {
  try {
    const policyDetails = await PolicyDetails.find();
    res.json(policyDetails);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

//get all policies without jwt
router.get("/policyDetailsWithoutJWT", async (req, res) => {
  try {
    const policyDetails = await PolicyDetails.find();
    res.json(policyDetails);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

//to post a policy detail
router.post("/addpolicy", auth, async (req, res) => {
  try {
    const newPolicyDetail = new PolicyDetails({
      policyName: req.body.policyName,
      code: req.body.code,
      description: req.body.description,
      status: req.body.status,
      amount: req.body.amount
    });
    const policyDetail = await newPolicyDetail.save();
    res.json(policyDetail);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//get all policies of logged in user
router.get("/userPolicies/", auth, async (req, res) => {
  try {
    const userDetails = await UserDetails.findOne({
      email: req.query.email
    });

    const user = userDetails._id;
    const userPolicies = await UserPolicy.findOne({ user });
    res.json(userPolicies.policyDetails);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

// @route  POST api/users
// @desc   Register User
// @access Public
router.post(
  "/register",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "please enter a password of more than 6 words").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      email,
      password,
      Gender,
      DateOfBirth,
      contactNumber
    } = req.body;

    try {
      // check if user exist
      let user = await UserDetails.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "user already exist " }] });
      }

      user = new UserDetails({
        name,
        email,
        password,
        Gender,
        DateOfBirth,
        contactNumber
      });

      // encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      console.log("saved");
      await user.save();

      // return jsonwebtoken
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) {
            throw err;
          } else {
            res.json({ token });
          }
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

//to add a policy detail for a user
//to add a policy detail for a user
router.post("/add", auth, async (req, res) => {
  try {
    const {
      email,
      policyName,
      code,
      description,
      date,
      duration,
      amount
    } = req.body;
    const policyDetail = {
      policyName: policyName,
      code: code,
      description: description,
      date: date,
      duration: duration,
      amount: amount
    };

    const userDetail = await UserDetails.findOne({ email });

    const userPolicy = await UserPolicy.findOne({
      user: userDetail._id
      //policyDetails: policyDetail._id
    });

    if (userPolicy != null && userPolicy.length !== 0) {
      console.log("if");
      console.log(userPolicy);
      userPolicy.policyDetails.push(policyDetail);
      console.log(userPolicy);
      const userPolicy1 = userPolicy.save();
      return res.json(userPolicy1);
    } else {
      const newUserPolicy = new UserPolicy({
        user: userDetail._id,
        policyDetails: policyDetail
      });
      const userpolicy = newUserPolicy.save();
      return res.json(userpolicy);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//when claim
router.post("/claim", auth, async (req, res) => {
  try {
    const {
      email,
      nature,
      clinicPinCode,
      description,
      startDate,
      endDate,
      regNo,
      doctorName,
      clinicName,
      claimedAmount
    } = req.body;
    const claimDetail = {
      nature: nature,
      clinicPinCode: clinicPinCode,
      description: description,
      startDate: startDate,
      endDate: endDate,
      regNo: regNo,
      doctorName: doctorName,
      clinicName: clinicName,
      claimedAmount: claimedAmount
    };

    const userDetail = await UserDetails.findOne({ email });

    const userClaim = await UserClaim.findOne({
      user: userDetail._id
    });

    if (userClaim != null && userClaim.length !== 0) {
      userClaim.claimDetails.push(claimDetail);
      const userClaim1 = userClaim.save();
      return res.json(userClaim1);
    } else {
      const newUserClaim = new UserClaim({
        user: userDetail._id,
        claimDetails: claimDetail
      });
      const userclaim = newUserClaim.save();
      return res.json(userclaim);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// router.get("/UserDetails")

module.exports = router;
