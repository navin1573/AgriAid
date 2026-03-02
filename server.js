const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Database setup
let db;
(async () => {
  try {
    db = await open({
      filename: './database.sqlite',
      driver: sqlite3.Database
    });
    
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        phone TEXT,
        password TEXT NOT NULL
      )
    `);
    console.log('Database connected and tables initialized');
  } catch (err) {
    console.error('Database initialization error:', err);
  }
})();

// JWT Secret
const SECRET_KEY = "your_fun_side_project_secret_key_123";

// Authentication middleware
const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: "Access denied. Token required" });
  
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = { userId: decoded.userId };
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

// API Routes
app.get('/api/user/profile', authenticate, async (req, res) => {
  try {
    const user = await db.get(
      'SELECT id, name, email FROM users WHERE id = ?',
      [req.user.userId]
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/register', async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.run(
      `INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)`,
      [name, email, phone, hashedPassword]
    );
    
    const token = jwt.sign({ userId: result.lastID }, SECRET_KEY, { expiresIn: '1h' });
    res.status(201).json({ 
      user: { id: result.lastID, name, email },
      token
    });
  } catch (err) {
    if (err.message.includes('UNIQUE constraint failed')) {
      return res.status(400).json({ error: "Email already exists" });
    }
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.get(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid password" });
    }
    
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
    const { password: _, ...userData } = user;
    res.json({ 
      message: "Login successful", 
      user: userData,
      token 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Frontend catch-all route (must be last)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});