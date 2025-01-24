import express from 'express';
    import sqlite3 from 'sqlite3';
    import { open } from 'sqlite';
    import cors from 'cors';
    import jwt from 'jsonwebtoken';
    import bcrypt from 'bcryptjs';
    import dotenv from 'dotenv';

    dotenv.config();
    const app = express();
    app.use(express.json());
    app.use(cors());

    const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';
    const dbPromise = initializeDb();

    async function initializeDb() {
      const db = await open({
        filename: './database.db',
        driver: sqlite3.Database
      });

      // Create tables if they don't exist
      await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
      `);

      return db;
    }

    // Registration endpoint
    app.post('/api/register', async (req, res) => {
      try {
        const { email, password } = req.body;

        if (!email || !password) {
          return res.status(400).json({ error: 'Email and password are required' });
        }

        const db = await dbPromise;
        const existingUser = await db.get('SELECT * FROM users WHERE email = ?', email);
        if (existingUser) {
          return res.status(400).json({ error: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const { lastID } = await db.run(
          'INSERT INTO users (email, password) VALUES (?, ?)',
          [email, hashedPassword]
        );

        const token = jwt.sign({ id: lastID }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
      } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ error: 'Registration failed' });
      }
    });

    // Error handling middleware
    app.use((err, req, res, next) => {
      console.error('Server error:', err);
      res.status(500).json({ error: 'Internal server error' });
    });

    const PORT = process.env.PORT || 5000;
    initializeDb().then(() => {
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    });
