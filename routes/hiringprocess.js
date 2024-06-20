const express = require('express');
const router = express.Router();
const hiringprocess = require('../controllers/hiringprocess');
const authenticateCompany = require('../middleware/companyauthentication');
const { createHiringProcess } = require('./controllers/hiringProcessController');
const { addCodingRound } = require('./controllers/codingRoundController');
const { updateCodingRound } = require('./controllers/codingRoundController');
const { updateInterviewRound } = require('./controllers/interviewRoundController');


router.put('/hiring-processes/:id', authenticateCompany , hiringprocess.updateHiringProcessByCompany);
router.put('/hiring-process/:id', updateHiringProcessByCompany);
router.post('/hiring-process', createHiringProcess);
router.post('/coding-rounds', addCodingRound);
router.put('/coding-rounds/:id', updateCodingRound);
router.put('/interview-rounds/:id', updateInterviewRound);

module.exports = router;