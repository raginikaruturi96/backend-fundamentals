const express = require("express");
const mongoose = require("mongoose");
const customerRoutes = require("./routes/customerRoutes");

const app = express();

// Middleware to read JSON body
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/learning_mongo")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Routes
app.use("/customers", customerRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
