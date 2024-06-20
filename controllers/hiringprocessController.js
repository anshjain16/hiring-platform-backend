const HiringProcess = require('../models/hiringProcess');
exports.createHiringProcess = async (req, res) => {
  try {
    const { title, desc, numRounds, startDate, endDate, companyId } = req.body;

    const newHiringProcess = new HiringProcess({
      title,
      desc,
      numRounds,
      startDate,
      endDate,
      companyId
    });

    await newHiringProcess.save();
    res.status(201).json({ message: 'Hiring process created successfully', hiringProcess: newHiringProcess });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.updateHiringProcessByCompany = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, desc, numRounds, startDate, endDate } = req.body;
      const companyId = req.user.companyId; 
  
      const hiringProcess = await HiringProcess.findById(id);
      if (!hiringProcess) {
        return res.status(404).json({ error: 'Hiring process not found' });
      }
      if (hiringProcess.companyId.toString() !== companyId) {
        return res.status(403).json({ error: 'You are not authorized to update this hiring process' });
      }
      hiringProcess.title = title;
      hiringProcess.desc = desc;
      hiringProcess.numRounds = numRounds;
      hiringProcess.startDate = startDate;
      hiringProcess.endDate = endDate;
  
      await hiringProcess.save();
      res.status(200).json(hiringProcess);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.addCodingRound = async (req, res) => {
    try {
        const { numQuestions, startDate, endDate, questions, hiringProcessId } = req.body;
        const companyId = req.user.companyId;

        const hiringProcess = await HiringProcess.findById(hiringProcessId);
        if (!hiringProcess) {
            return res.status(404).json({ error: 'Hiring process not found' });
        }
        if (hiringProcess.companyId.toString() !== companyId) {
            return res.status(403).json({ error: 'You are not authorized to add a coding round to this hiring process' });
        }

        const newCodingRound = new CodingRound({
            numQuestions,
            startDate,
            endDate,
            questions,
            hiringProcessId
        });

        await newCodingRound.save();
        res.status(201).json(newCodingRound);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateCodingRound = async (req, res) => {
    try {
        const { id } = req.params;
        const { numQuestions, startDate, endDate } = req.body;
        const companyId = req.user.companyId;

        const codingRound = await CodingRound.findById(id);
        if (!codingRound) {
            return res.status(404).json({ error: 'Coding round not found' });
        }

        const hiringProcess = await HiringProcess.findById(codingRound.hiringProcessId);
        if (hiringProcess.companyId.toString() !== companyId) {
            return res.status(403).json({ error: 'You are not authorized to update this coding round' });
        }

        if (numQuestions) codingRound.numQuestions = numQuestions;
        if (startDate) codingRound.startDate = startDate;
        if (endDate) codingRound.endDate = endDate;

        await codingRound.save();
        res.status(200).json(codingRound);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateInterviewRound = async (req, res) => {
    try {
        const { id } = req.params;
        const { startDate, endDate, duration, type } = req.body;
        const companyId = req.user.companyId;

        const interviewRound = await InterviewRound.findById(id);
        if (!interviewRound) {
            return res.status(404).json({ error: 'Interview round not found' });
        }

        const hiringProcess = await HiringProcess.findById(interviewRound.hiringProcessId);
        if (hiringProcess.companyId.toString() !== companyId) {
            return res.status(403).json({ error: 'You are not authorized to update this interview round' });
        }

        if (startDate) interviewRound.startDate = startDate;
        if (endDate) interviewRound.endDate = endDate;
        if (duration) interviewRound.duration = duration;
        if (type) interviewRound.type = type;

        await interviewRound.save();
        res.status(200).json(interviewRound);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

