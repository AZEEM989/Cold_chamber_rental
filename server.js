

// NEW 
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json()); // Middleware for JSON body parsing

// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "007@Timedie",
    database: "coldchamber"
});

db.connect((err) => {
    if (err) {
        console.error("❌ Database Connection Failed:", err.message);
    } else {
        console.log("✅ Connected to MySQL Database!");
    }
});

// API Route to Save Data
app.post("/save", (req, res) => {
    console.log("Received Request Body:", req.body); // ✅ Now inside the function

    const { NAME, ADDRESS, MOBILE_NO, fruit, BOX_WEIGHT, BOX_QUANTITY, TOTAL_AMOUNT, PAID_AMOUNT, UNPAID_AMOUNT } = req.body;

    // Check if any field is missing
    if (!NAME || !ADDRESS || !MOBILE_NO || !fruit || !BOX_WEIGHT || !BOX_QUANTITY || !TOTAL_AMOUNT || !PAID_AMOUNT || !UNPAID_AMOUNT) {
        return res.status(400).json({ error: "❌ All fields are required!" });
    }

    const sql = `INSERT INTO clients (NAME, ADDRESS, MOBILE_NO, fruit, BOX_WEIGHT, BOX_QUANTITY, TOTAL_AMOUNT, PAID_AMOUNT, UNPAID_AMOUNT) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [NAME, ADDRESS, MOBILE_NO, fruit, BOX_WEIGHT, BOX_QUANTITY, TOTAL_AMOUNT, PAID_AMOUNT, UNPAID_AMOUNT], (err, result) => {
        if (err) {
            console.error("❌ Database Insert Error:", err.message);
            return res.status(500).json({ error: "Database Insert Error: " + err.message });
        } else {
            res.json({ message: "✅ Data saved successfully!" });
        }
    });
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

