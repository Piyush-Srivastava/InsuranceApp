const express = require("express");
const connectDB = require("./config/db");
const Form = require("./models/Form");
const FormDetails = require("./models/FormDetails");

const app = express();

// connect database
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API running"));

// Define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/policy", require("./routes/api/policy"));

app.post("/fillform", async (req, res) => {
  const { firstName, lastName, city, mobileNumber } = req.body;

  const form = new Form({
    firstName: firstName,
    lastName: lastName,
    city: city,
    mobileNumber: mobileNumber
  });

  await form.save();
  res.json({ msg: "Data saved" });
});

app.post("/formDetails", async (req, res) => {
  const {
    FirstName,
    MiddleName,
    LastName,
    email,
    emp_type,
    dob,
    mobileNumber,
    pan,
    pincode,
    experience,
    income
  } = req.body;
  console.log(req.body);
  const form = await Form.findOne({ mobileNumber: mobileNumber });
  const formDetails = new FormDetails({
    FirstName: FirstName,
    LastName: LastName,
    MiddleName: MiddleName,
    email: email,
    mobileNumber: mobileNumber,
    dob: dob,
    income: income,
    pincode: pincode,
    emp_type: emp_type,
    experience: experience,
    pan: pan,
    customer: form
  });

  await formDetails.save();
  res.json({ msg: "Data saved", status: "1" });
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on ${PORT}`));
