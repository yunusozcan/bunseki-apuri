const express = require('express');
const measures = require('./measures');
const sites = require('./sites');

const router = express.Router();

router.use('/measures', measures);
router.use('/sites', sites);

module.exports = router;
