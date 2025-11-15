const mysql = require("mysql2");

function createDBConnection() {
  return mysql.createPool({
    host: process.env.DB_HOST || "mysql",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "Varshini@747",
    database: process.env.DB_NAME || "students_db",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
}

const db = createDBConnection();

function tryConnect(retries = 20, delay = 2000) {
  db.getConnection((err, conn) => {
    if (err) {
      console.log(`⏳ MySQL not ready (${retries} retries left)...`);
      console.log("🔁 Error:", err.code);

      if (retries > 0) {
        return setTimeout(() => tryConnect(retries - 1, delay), delay);
      }

      console.log("❌ Could not connect to MySQL after multiple attempts.");
    } else {
      console.log("✅ MySQL Connected Successfully");
      conn.release();
    }
  });
}

tryConnect();

module.exports = db;
