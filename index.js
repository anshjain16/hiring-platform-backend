const express = require("express");
const connectDB = require("./db/connect");
const cors = require("cors");

const dotenv = require("dotenv");
const companyRoutes = require("./routes/company");
const hiringProcessRoutes = require("./routes/hiringProcess");
const codingRouteRoutes = require("./routes/codingRound");
const interviewRoundRoutes = require("./routes/interviewRound");
const companyemployee = require("./routes/companyemployee");
const question = require("./routes/programmingquestion");
const candidateRouter = require("./routes/candidate");
const programmingQuestionRouter = require("./routes/programmingquestion");
const processRegistrationRouter = require("./routes/processRegistration");

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: "application/vnd.api+json" }));
app.use(cors());

app.use(express.json());
app.use("/api/company", companyRoutes);
app.use("/api/hiring", hiringProcessRoutes);
app.use("/api/codinground", codingRouteRoutes);
app.use("/api/interviewround", interviewRoundRoutes);
app.use("/api/companyemployee", companyemployee);
app.use("/api/question", question);
app.use("/api/candidate", candidateRouter);
app.use("/api/question", programmingQuestionRouter);
app.use("/api/register", processRegistrationRouter);

app.listen(8000, async () => {
  console.log("Server Started at port 8000");
  try {
    await connectDB(process.env.DATABASE_URL);
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
  }
});
