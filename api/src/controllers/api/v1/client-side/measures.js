const express = require('express');
const models = require('../../../../models');

const router = express.Router();

router.post('/', (req, res) => {
    try {
        if (Object.keys(req.body).length === 0 || !req.body.data || Object.keys(req.body.data).length === 0) {
            res.status(400).send('400 Bad Request!');
        } else {
            models.Site.findOne({ where: { uuId: req.body.uuId } }).then((site) => {
                if(site){
                    models.Measurement.bulkCreate(req.body.data.map((a)=> {
                        a.SiteId = site.id;
                        return a;
                    })).then((response) => {
                        res.status(200).send('OK!')
                    });
                } else {
                    res.status(404).send('404 Not found!');
                }
            });
        }
    } catch (e) {
        res.status(500).send('500 Something went wrong!');
    }
});

module.exports = router;
