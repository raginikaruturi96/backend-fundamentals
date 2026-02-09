const pool = require("../db/index.js");

// CREATE
const createUser = async (name, email) => {
  const result = await pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
    [name, email]
  );
  return result.rows[0];
};

const getAllUsers = async () => {
  const result = await pool.query("SELECT * FROM users ORDER BY id");
  return result.rows;
};

// READ BY ID
const getUserById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE id = $1",
    [id]
  );
  return result.rows[0];
};

// UPDATE
const updateUser = async (id, name, email) => {
  const result = await pool.query(
    "UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *",
    [name, email, id]
  );
  return result.rows[0];
};

// DELETE
const deleteUser = async (id) => {
  const result = await pool.query(
    "DELETE FROM users WHERE id=$1 RETURNING *",
    [id]
  );
  return result.rows[0];
};

module.exports = { createUser, getAllUsers, getUserById, updateUser, deleteUser };
