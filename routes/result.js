const express = require("express");
const router = express.Router();
const {
    getResultById,
    getAllResults,
    createResult
} = require("../controllers/result");

router.get('/results', getAllResults);
router.get('/results/:id', getResultById)
router.post('/results', createResult);

module.exports = router;