// Test database connection
import dotenv from "dotenv";
import mysql from "mysql2/promise";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, ".env") });

console.log("🔧 Testing Database Connection...");
console.log("Host:", process.env.DB_HOST);
console.log("User:", process.env.DB_USER);
console.log("Database:", process.env.DB_NAME);

async function testConnection() {
  const config = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: process.env.DB_HOST && process.env.DB_HOST.includes('azure.com') ? {
      rejectUnauthorized: false
    } : false,
  };

  console.log("\n🔧 Connection Config:");
  console.log("Host:", config.host);
  console.log("User:", config.user);
  console.log("SSL:", config.ssl ? "Enabled" : "Disabled");

  try {
    const connection = await mysql.createConnection(config);
    console.log("✅ Database connection successful!");
    
    // Test a simple query
    const [rows] = await connection.execute("SELECT 1 as test");
    console.log("✅ Test query successful:", rows);
    
    await connection.end();
  } catch (error) {
    console.error("❌ Database connection failed:");
    console.error("Error Code:", error.code);
    console.error("Error Message:", error.message);
    
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log("\n💡 Possible solutions:");
      console.log("1. Check your DB_USER and DB_PASSWORD in .env file");
      console.log("2. Verify the user has permissions to access the database");
    }
    
    if (error.code === 'ER_SECURE_TRANSPORT_REQUIRED') {
      console.log("\n💡 SSL is required for this connection");
      console.log("The updated db.js should handle this automatically");
    }
  }
}

testConnection();