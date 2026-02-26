import mysql from "mysql2/promise";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the backend directory
dotenv.config({ path: path.join(__dirname, ".env") });

// Debug: Check if environment variables are loaded
console.log("🔧 Database Configuration:");
console.log("Host:", process.env.DB_HOST);
console.log("User:", process.env.DB_USER);
console.log("Database:", process.env.DB_NAME);

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "mirpurdohs832",
  database: process.env.DB_NAME || "slumlink",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // SSL configuration for Azure MySQL
  ssl: process.env.DB_HOST && process.env.DB_HOST.includes('azure.com') ? {
    rejectUnauthorized: false
  } : false,
  // Add timeout settings
  acquireTimeout: 60000,
  timeout: 60000,
});

// Test database connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Database connected successfully!");
    connection.release();
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    console.error("🔍 Check your .env file and database credentials");
  }
}

// Test connection on initialization
testConnection();

export default pool;
