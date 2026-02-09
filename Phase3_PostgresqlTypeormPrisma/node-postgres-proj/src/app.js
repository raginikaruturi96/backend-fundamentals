const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes.js");

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("CRUD API is running 🚀");
});

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
