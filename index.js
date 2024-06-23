const express = require("express");
const connectDB = require("./db/connect");
// const runInserts = require("./dbtester/insert");
const dotenv = require("dotenv");
const companyRoutes = require("./routes/company");
const hiringProcessRoutes = require("./routes/hiringProcess");
const codingRouteRoutes = require("./routes/codingRound");
dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: "application/vnd.api+json" }));

app.use(express.json());
app.use("/api/company", companyRoutes);
app.use("/api/hiring", hiringProcessRoutes);
app.use("/api/codinground", codingRouteRoutes);

app.listen(8000, async () => {
  console.log("Server Started at port 8000");
  try {
    await connectDB(process.env.DATABASE_URL);
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
  }
});
