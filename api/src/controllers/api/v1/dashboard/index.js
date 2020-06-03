const express = require('express');
const measures = require('./measures');
const list = require('./list');

const router = express.Router();

router.use('/measures', measures);
router.use('/list', list);

module.exports = router;
