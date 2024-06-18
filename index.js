const app = require("express");
const connectDB = require("./db/connect");
const dotenv = require("dotenv");
dotenv.config();

const server = app();

console.log(".\n.\n.\n.\nHIRING_PLATFORM");
server.listen(8000, async () => {
  console.log("Server Started at port 8000");
  try {
    await connectDB(process.env.DATABASE_URL);
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
  }
});
