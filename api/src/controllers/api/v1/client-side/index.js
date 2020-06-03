const express = require('express');
const measures = require('./measures');

const router = express.Router();

router.use('/measures', measures);

module.exports = router;
