const mongoose = require("mongoose");
const {
  Company,
  HiringProcess,
  CodingRound,
  InterviewRound,
  ProgrammingQuestion,
  CompanyEmployee,
  Candidate,
  Registration,
  Result,
} = require("../models/schema"); // Adjust the path as necessary

async function insertCompany() {
  const company = new Company({
    name: "Tech Corp",
    desc: "A leading tech company",
    username: "techcorp",
    password: "securepassword",
    logoUrl: "http://example.com/logo.png",
    location: "San Francisco",
  });
  await company.save();
  console.log("Company inserted:", company);
  return company._id;
}

async function insertCompanyEmployee(companyId) {
  const employee = new CompanyEmployee({
    name: "John Doe",
    position: "HR Manager",
    email: "john@example.com",
    companyId: companyId,
  });
  await employee.save();
  console.log("Employee inserted:", employee);
  return employee._id;
}

async function insertCandidate() {
  const candidate = new Candidate({
    name: "Jane Smith",
    username: "janesmith",
    password: "securepassword",
    university: "State University",
    address: "123 Main St",
    resumeUrl: "http://example.com/resume.pdf",
  });
  await candidate.save();
  console.log("Candidate inserted:", candidate);
  return candidate._id;
}

async function insertHiringProcess(companyId) {
  const hiringProcess = new HiringProcess({
    title: "Software Engineer Hiring",
    desc: "Hiring process for Software Engineer position",
    numRounds: 2,
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week later
    companyId: companyId,
  });
  await hiringProcess.save();
  console.log("HiringProcess inserted:", hiringProcess);
  return hiringProcess._id;
}

async function insertCodingRound(hiringProcessId) {
  const codingRound = new CodingRound({
    numQuestions: 3,
    startDate: new Date(),
    endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days later
    hiringProcessId: hiringProcessId,
  });
  await codingRound.save();
  console.log("CodingRound inserted:", codingRound);
  return codingRound._id;
}

async function insertInterviewRound(hiringProcessId, employeeId) {
  const interviewRound = new InterviewRound({
    startDate: new Date(),
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days later
    duration: 60,
    type: "Technical",
    interviewers: [employeeId],
    hiringProcessId: hiringProcessId,
  });
  await interviewRound.save();
  console.log("InterviewRound inserted:", interviewRound);
  return interviewRound._id;
}

async function insertProgrammingQuestion(codingRoundId) {
  const question = new ProgrammingQuestion({
    title: "Reverse a String",
    desc: "Write a function to reverse a string.",
    constraints: "The input string will not exceed 100 characters.",
    example: "Input: 'hello' -> Output: 'olleh'",
    languages: "python",
    testcases: ["hello", "world"],
    expectedOutput: ["olleh", "dlrow"],
    numHiddenTestcases: 1,
  });
  await question.save();
  console.log("ProgrammingQuestion inserted:", question);

  // Associate question with coding round
  await CodingRound.findByIdAndUpdate(codingRoundId, {
    $push: { questions: question._id },
  });
  return question._id;
}

async function insertRegistration(candidateId, hiringProcessId, employeeId) {
  const registration = new Registration({
    candidateId: candidateId,
    hiringProcessId: hiringProcessId,
    status: "registered",
    interviewSlots: [
      {
        roundNumber: 1,
        startDateTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days later
        endDateTime: new Date(
          Date.now() + 4 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000
        ), // 1 hour later
        interviewerId: employeeId,
      },
    ],
  });
  await registration.save();
  console.log("Registration inserted:", registration);
  return registration._id;
}

async function insertResult(candidateId, roundId, roundType) {
  const result = new Result({
    candidateId: candidateId,
    roundId: roundId,
    roundType: roundType,
    score: 85,
    feedback: "Good performance",
  });
  await result.save();
  console.log("Result inserted:", result);
  return result._id;
}

async function runInserts() {
  //   const companyId = await insertCompany();
  //   const employeeId = await insertCompanyEmployee(companyId);
  //   const candidateId = await insertCandidate();
  //   const hiringProcessId = await insertHiringProcess(companyId);
  //   const codingRoundId = await insertCodingRound(hiringProcessId);
  //   const interviewRoundId = await insertInterviewRound(
  //     hiringProcessId,
  //     employeeId
  //   );
  //   const questionId = await insertProgrammingQuestion(codingRoundId);
  //   const registrationId = await insertRegistration(
  //     candidateId,
  //     hiringProcessId,
  //     employeeId
  //   );
  //   const resultId = await insertResult(candidateId, codingRoundId, "coding");
}

runInserts().catch((err) => console.error(err));
module.exports = runInserts;
