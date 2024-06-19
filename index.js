const express = require('express')
const connectDB = require("./db/connect");
// const runInserts = require("./dbtester/insert");
const dotenv = require("dotenv");
const companyRoutes = require('./routes/companyRoutes');
dotenv.config();

const app = express();
app.use(express.json());
app.use('/api',companyRoutes)
app.listen(8000, async () => {
  console.log("Server Started at port 8000");
  try {
    await connectDB(process.env.DATABASE_URL);
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
  }
});
