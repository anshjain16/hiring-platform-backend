const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    desc: { type: String, required: true },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    logoUrl: { type: String },
    location: { type: String },
    hiringProcesses: [
      { type: mongoose.Schema.Types.ObjectId, ref: "HiringProcess" },
    ],
    employees: [
      { type: mongoose.Schema.Types.ObjectId, ref: "CompanyEmployee" },
    ],
  },
  { timestamps: true }
);

const hiringProcessSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    numRounds: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    codingRounds: [
      { type: mongoose.Schema.Types.ObjectId, ref: "CodingRound" },
    ],
    interviewRounds: [
      { type: mongoose.Schema.Types.ObjectId, ref: "InterviewRound" },
    ],
    registrationLink: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

const codingRoundSchema = new mongoose.Schema(
  {
    numQuestions: { type: Number, required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    questions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "ProgrammingQuestion" },
    ],
    hiringProcessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HiringProcess",
      required: true,
    },
  },
  { timestamps: true }
);

const interviewRoundSchema = new mongoose.Schema(
  {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    duration: { type: Number, required: true },
    type: { type: String, required: true, enum: ["HR", "Technical"] },
    interviewers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "CompanyEmployee",
    },
    hiringProcessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HiringProcess",
      required: true,
    },
  },
  { timestamps: true }
);

const programmingQuestionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    constraints: { type: String, required: true },
    example: { type: String, required: true },
    score: { type: Number, default: 20 },
    languages: {
      type: [String],
      enum: ["cpp", "java", "python"],
      required: true,
    },
    testcases: [
      {
        input: { type: String, required: true },
        expectedOutput: { type: String, required: true },
        isHidden: { type: Boolean, default: false },
        weightage: { type: Number, default: 0 },
      },
    ],
    timeLimit: { type: Number, required: true },
    memoryLimit: { type: Number, required: true },
    codingRoundId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CodingRound",
      required: true,
    },
  },
  { timestamps: true }
);

const companyEmployeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    position: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
  },
  { timestamps: true }
);

const candidateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: { type: String, required: true },
    university: { type: String },
    address: { type: String },
    resumeUrl: { type: String },
    email: { type: String, required: true, unique: true },
    applicationStatus: {
      type: String,
      enum: ["applied", "under review", "rejected", "accepted"],
      default: "applied",
    },
    registrations: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Registration" },
    ],
  },
  { timestamps: true }
);

const interviewSlotSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  interviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "InterviewRound",
    required: true,
  },
  interviewerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CompanyEmployee",
    required: true,
  },
});

const registrationSchema = new mongoose.Schema(
  {
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
      required: true,
    },
    hiringProcessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HiringProcess",
      required: true,
    },
    status: {
      type: String,
      enum: ["registered", "completed", "failed", "passed"],
      default: "registered",
    },
    interviewSlots: [interviewSlotSchema],
  },
  { timestamps: true }
);

const resultSchema = new mongoose.Schema(
  {
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
      required: true,
    },
    roundId: { type: mongoose.Schema.Types.ObjectId, required: true },
    roundType: { type: String, enum: ["coding", "interview"], required: true },
    score: { type: Number },
    status: { type: String, enum: ["Pass", "Fail"], required: true },
    feedback: { type: String },
  },
  { timestamps: true }
);

resultSchema.virtual("round", {
  ref: function (doc) {
    return doc.roundType === "coding" ? "CodingRound" : "InterviewRound";
  },
  localField: "roundId",
  foreignField: "_id",
  justOne: true,
});

const submissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProgrammingQuestion",
      required: true,
    },
    submissionTime: {
      type: Date,
      default: Date.now,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      enum: ["cpp", "java", "python"],
      required: true,
    },
    result: {
      type: String,
      enum: ["pass", "fail", "partial"],
      required: true,
    },
    testCasesPassed: {
      type: Number,
      required: true,
    },
    totalTestCases: {
      type: Number,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    token: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = {
  Company: mongoose.model("Company", companySchema),
  HiringProcess: mongoose.model("HiringProcess", hiringProcessSchema),
  CodingRound: mongoose.model("CodingRound", codingRoundSchema),
  InterviewRound: mongoose.model("InterviewRound", interviewRoundSchema),
  ProgrammingQuestion: mongoose.model(
    "ProgrammingQuestion",
    programmingQuestionSchema
  ),
  CompanyEmployee: mongoose.model("CompanyEmployee", companyEmployeeSchema),
  Candidate: mongoose.model("Candidate", candidateSchema),
  Registration: mongoose.model("Registration", registrationSchema),
  Result: mongoose.model("Result", resultSchema),
  Submission: mongoose.model("Submission", submissionSchema),
  InterviewSlot: mongoose.model("InterviewSlot", interviewSlotSchema),
};
