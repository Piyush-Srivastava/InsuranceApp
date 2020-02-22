const express = require("express");
const connectDB = require("./config/db");

const cors = require("cors");
const app = express();

// connect database
connectDB();

// Init middleware
app.use(express.json({ extended: false }));
app.use(cors());
app.get("/", (req, res) => res.send("API running"));

// Define routes
app.use("/api/policy", require("./routes/api/policy"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on ${PORT}`));
