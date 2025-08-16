import db from "../../db.js";

export const registerUser = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  if (typeof name !== "string" || typeof email !== "string" || typeof password !== "string") {
    return res.status(400).json({ error: "Invalid input types" });
  }
  if (name.length < 3 || email.length < 5 || password.length < 6) {
    return res.status(400).json({ error: "Input values are too short" });
  }
  if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }
  if (password.includes(" ")) {
    return res.status(400).json({ error: "Password cannot contain spaces" });
  }
  if (password.length > 20) {
    return res.status(400).json({ error: "Password is too long" });
  }
  if (name.length > 50 || email.length > 100) {
    return res.status(400).json({ error: "Input values are too long" });
  }


  const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

  db.query(query, [name, email, password], (err, result) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.status(200).json({ message: "User registered successfully", id: result.insertId });
  });
};

export const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  if (typeof email !== "string" || typeof password !== "string") {
    return res.status(400).json({ error: "Invalid input types" });
  }

  const query = "SELECT * FROM users WHERE email = ? AND password = ?";

  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful", user: results[0] });
  });
}
