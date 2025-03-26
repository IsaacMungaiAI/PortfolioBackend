require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors(
    {
        origin: "https://isaacmungai.vercel.app", // Change this to your frontend URL
        methods: "GET,POST,PUT,DELETE,OPTIONS",
        credentials: true
    }
));
app.use(express.json());

// Create database connection using an object
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectTimeout: 20000
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed: ", err);
    } else {
        console.log("Connected to MySQL database. PORT: ");
    }
});



app.get("/projects", (req, res) => {
    db.query("SELECT * from projects", (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Database projects query failed" });
        }
        res.json(result);
        console.log(result);
    });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
