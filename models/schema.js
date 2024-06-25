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
    languages: {
      type: String,
      enum: ["c++", "java", "python"],
      required: true,
    },
    testcases: { type: [String], required: true },
    expectedOutput: { type: [String], required: true },
    numHiddenTestcases: { type: Number, required: true },
  },
  { timestamps: true }
);

const companyEmployeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    position: { type: String, required: true },
    email: { type: String, required: true, unique: true },
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
      enum: ["registered", "completed", "failed"],
      default: "registered",
    },
    interviewSlots: [
      {
        roundNumber: { type: Number, required: true },
        startDateTime: { type: Date, required: true },
        endDateTime: { type: Date, required: true },
        interviewerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "CompanyEmployee",
          required: true,
        },
      },
    ],
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
};
