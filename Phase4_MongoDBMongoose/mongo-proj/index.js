const express = require("express");
const mongoose = require("mongoose");
const customerRoutes = require("./routes/customer.routes");

const app = express();

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/mongoLearn")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/customers", customerRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

