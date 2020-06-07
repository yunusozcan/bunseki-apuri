const express = require('express');
const models = require('../../../../models');
const passport = require('passport');

const router = express.Router();

router.post('/', passport.authenticate('client-side', { session: false }), (req, res) => {
    try {
        if (Object.keys(req.body).length === 0 || !req.body.metrics || Object.keys(req.body.metrics).length === 0) {
            res.status(400).send('400 Bad Request!');
        } else {
            models.Site.findOne({ where: { id: req.user.id } }).then((site) => {
                models.Measurement.bulkCreate(req.body.metrics.map((a)=> {
                    a.SiteId = req.user.id;
                    return a;
                })).then((response) => {
                    res.status(200).send('OK!')
                });
            });
        }
    } catch (e) {
        res.status(500).send('500 Something went wrong!');
    }
});

module.exports = router;
