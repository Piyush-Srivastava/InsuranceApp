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
    const userPolicies = await UserPolicy.find({ user });
    const policies = [];

    userPolicies.forEach(async userPolicy => {
      let policyDetail = await PolicyDetails.findById(userPolicy.policyDetails);
      policies.push(policyDetail);
    });

    res.json(policies);
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
router.post("/add", auth, async (req, res) => {
  try {
    const { email, code } = req.body;
    const policyDetail = await PolicyDetails.findOne({ code });

    const userDetail = await UserDetails.findOne({ email });

    const newUserPolicy = await new UserPolicy({
      user: userDetail._id,
      policyDetails: policyDetail._id
    });

    const userPolicy = newUserPolicy.save();
    return res.json(userPolicy);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
