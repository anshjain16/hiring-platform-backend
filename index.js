const express = require("express");
const connectDB = require("./db/connect");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");

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
const submissionRouter = require("./routes/submission");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

io.on("connection", (socket) => {
  console.log(`Socket Connected`, socket.id);
  socket.on("room:join", (data) => {
    const { email, room } = data;
    emailToSocketIdMap.set(email, socket.id);
    socketidToEmailMap.set(socket.id, email);
    io.to(room).emit("user:joined", { email, id: socket.id });
    socket.join(room);
    io.to(socket.id).emit("room:join", data);
  });

  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });
});

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
app.use("/api/submission", submissionRouter);

server.listen(8000, async () => {
  console.log("Server Started at port 8000");
  try {
    await connectDB(process.env.DATABASE_URL);
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
  }
});
