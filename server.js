const express = require("express");
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// MongoDB connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Schema & Model
const operationSchema = new mongoose.Schema({
  operation: String,
  n1: Number,
  n2: Number,
  result: Number,
});
const Operation = mongoose.model('Operation', operationSchema);

// Utility functions
const validate = (n1, n2) => !(isNaN(n1) || isNaN(n2));
const add = (n1, n2) => n1 + n2;
const subtract = (n1, n2) => n1 - n2;
const multiply = (n1, n2) => n1 * n2;
const divide = (n1, n2) => n1 / n2;

// Serve homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// CRUD endpoints
const handleOperation = async (req, res, operationFunc, operationName) => {
  const n1 = parseInt(req.query.n1);
  const n2 = parseInt(req.query.n2);

  if (!validate(n1, n2)) {
    return res.status(400).json({ statuscode: 400, message: "Invalid input. Please enter valid numbers." });
  }
  if (operationName === "divide" && n2 === 0) {
    return res.status(400).json({ statuscode: 400, message: "Invalid input. Can't divide by 0" });
  }

  const result = operationFunc(n1, n2);
  try {
    await Operation.create({ operation: operationName, n1, n2, result });
  } catch (err) {
    console.error("Error saving to DB:", err);
  }
  res.json({ statuscode: 200, data: result });
};

app.get("/add", (req, res) => handleOperation(req, res, add, "add"));
app.get("/subtract", (req, res) => handleOperation(req, res, subtract, "subtract"));
app.get("/multiply", (req, res) => handleOperation(req, res, multiply, "multiply"));
app.get("/divide", (req, res) => handleOperation(req, res, divide, "divide"));

// Optional: fetch history
app.get("/history", async (req, res) => {
  //const history = await Operation.find().sort({ date: -1 }).limit(10);
  const history = await Operation.find({}, { __v: 0, date: 0 }).sort({ _id: -1 }).limit(10);
  res.json({ statuscode: 200, data: history });
});

// Start server
const port = process.env.PORT || 3040;
app.listen(port, '0.0.0.0', () => {
  console.log("✅ Server running on port " + port);
});



