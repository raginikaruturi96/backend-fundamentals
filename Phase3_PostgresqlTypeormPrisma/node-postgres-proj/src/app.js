import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("CRUD API is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
