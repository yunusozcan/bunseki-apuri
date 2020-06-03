const express = require('express');
const models = require('../../../../models');

const router = express.Router();

router.get('/', (req, res) => {
    try {
        models.Site.findAll({
            attributes: ['id', 'webAdress']
        }).then((response) => {
            res.json(response);
        });
    } catch (e) {
        res.status(500).send('500 Something went wrong!');
    }
});

module.exports = router;
