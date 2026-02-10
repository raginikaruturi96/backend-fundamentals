import express from "express";

const app = express();
app.use(express.json());

let users = [];

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

/**
 * CREATE USER
 */
app.post("/users", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  const newUser = {
    id: users.length + 1,
    name,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

/**
 * READ ALL USERS
 */
app.get("/users", (req, res) => {
  res.status(200).json(users);
});

/**
 * READ USER BY ID
 */
app.get("/users/:id", (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).json(user);
});

/**
 * UPDATE USER
 */
app.put("/users/:id", (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  user.name = req.body.name || user.name;
  res.status(200).json(user);
});

/**
 * DELETE USER
 */
app.delete("/users/:id", (req, res) => {
  const index = users.findIndex(u => u.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  users.splice(index, 1);
  res.status(204).send();
});

/**
 * TEST HELPER (reset data)
 * Only for testing purposes
 */
app.resetUsers = () => {
  users = [];
};

export default app;
