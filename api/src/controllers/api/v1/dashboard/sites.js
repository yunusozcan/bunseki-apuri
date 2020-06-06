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

router.post('/new', (req, res) => {
    try {
        const uuid =  require('crypto').randomBytes(64).toString('base64');
        models.Site.findOrCreate({
            where: {webAdress: req.body.site}
        }).spread((site, created) => {
            if (created) {
                site.set("uuId", uuid);
                site.save();
            }
            res.json({key: site.uuId});
        });
    } catch (e) {
        res.status(500).send('500 Something went wrong!');
    }
});

module.exports = router;
