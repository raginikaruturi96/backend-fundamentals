const express = require("express");
const Customer = require("../models/Customer");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json(customer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.get("/", async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
});

module.exports = router; 
