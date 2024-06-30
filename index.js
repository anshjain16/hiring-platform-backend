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
const resultRouter = require("./routes/result");

const { Candidate } = require("./models/schema");

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
  socket.on("interviewer:join:room", ({ interviewId }) => {
    socket.join(interviewId);
    io.to(socket.id).emit("interviewer:room:joined", { id: socket.id });
  });

  socket.on("candidate:join:room", ({ interviewId, candidateId }) => {
    socket.join(interviewId);
    io.to(socket.id).emit("joined:room", { socketId: socket.id });
    io.to(interviewId).emit("candidate:join:room", { candidateId });
  });

  socket.on("candidate:leave:room", ({ interviewId }) => {
    socket.leave(interviewId);
    io.to(interviewId).emit("candidate:leave:room", { candidateId: socket.id });
  });

  socket.on("call:candidate", ({ interviewId, candidateId, remotePeerId }) => {
    io.to(interviewId).emit("call:request", { candidateId, remotePeerId });
  });

  socket.on("call:accepted", ({ interviewerSocketId, candidateSocketId }) => {
    io.to(interviewerSocketId).emit("call:accepted", {
      candidateSocketId,
      interviewerSocketId,
    });
  });

  socket.on("call:me", ({ remotePeerId, remoteSocketId }) => {
    io.to(remoteSocketId).emit("call:me", { remoteSocketId, remotePeerId });
  });
  socket.on("id:transfer", ({ remoteSocketId, candidateId }) => {
    io.to(remoteSocketId).emit("id:transfer", { candidateId });
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
app.use("/api/result", resultRouter);

server.listen(8000, async () => {
  console.log("Server Started at port 8000");
  try {
    await connectDB(process.env.DATABASE_URL);
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
  }
});
