const express = require('express');
const { Op } = require("sequelize");
const models = require('../../../../models');

const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        // Last 30 Mins
        const data = {
            dom: await models.Measurement.findAll({
                attributes:["value", "timestamp"],
                where: {
                    SiteId: req.params.id,
                    timestamp: {
                        [Op.gt]: new Date(new Date() -  30 * 60 * 1000)
                    },
                    type: "dom"
                },
                order: [
                    ['type', 'ASC'],
                    ['timestamp', 'ASC'],
                ],
            }),
            window: await models.Measurement.findAll({
                attributes:["value", "timestamp"],
                where: {
                    SiteId: req.params.id,
                    timestamp: {
                        [Op.gt]: new Date(new Date() -  30 * 60 * 1000)
                    },
                    type: "window"
                },
                order: [
                    ['type', 'ASC'],
                    ['timestamp', 'ASC'],
                ],
            }),
            fcp: await models.Measurement.findAll({
                attributes:["value", "timestamp"],
                where: {
                    SiteId: req.params.id,
                    timestamp: {
                        [Op.gt]: new Date(new Date() -  30 * 60 * 1000)
                    },
                    type: "fcp"
                },
                order: [
                    ['type', 'ASC'],
                    ['timestamp', 'ASC'],
                ],
            }),
            ttfb: await models.Measurement.findAll({
                attributes:["value", "timestamp"],
                where: {
                    SiteId: req.params.id,
                    timestamp: {
                        [Op.gt]: new Date(new Date() -  30 * 60 * 1000)
                    },
                    type: "ttfb"
                },
                order: [
                    ['type', 'ASC'],
                    ['timestamp', 'ASC'],
                ],
            })
        };

        models.Site.findOne({
            where: {
                id: req.params.id
            }
        }).then((response) => {
            if (response) {
                res.status(200).json(data);
            } else {
               res.status(404).send('404 Not found!');
            }
        });

    } catch (e) {
        res.status(500).send('500 Something went wrong!');
    }
});

router.post('/:id', async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
            res.status(400).send('400 Bad Request!');
        } else {
            // Between specific dates
            const data = {
                dom: await models.Measurement.findAll({
                    attributes:["value", "timestamp"],
                    where: {
                        SiteId: req.params.id,
                        timestamp: {
                            [Op.gte]: new Date(req.body.startDate),
                            [Op.lte]: new Date(req.body.endDate)
                        },
                        type: "dom"
                    },
                    order: [
                        ['type', 'ASC'],
                        ['timestamp', 'ASC'],
                    ],
                }),
                window: await models.Measurement.findAll({
                    attributes:["value", "timestamp"],
                    where: {
                        SiteId: req.params.id,
                        timestamp: {
                            [Op.gte]: new Date(req.body.startDate),
                            [Op.lte]: new Date(req.body.endDate)
                        },
                        type: "window"
                    },
                    order: [
                        ['type', 'ASC'],
                        ['timestamp', 'ASC'],
                    ],
                }),
                fcp: await models.Measurement.findAll({
                    attributes:["value", "timestamp"],
                    where: {
                        SiteId: req.params.id,
                        timestamp: {
                            [Op.gte]: new Date(req.body.startDate),
                            [Op.lte]: new Date(req.body.endDate)
                        },
                        type: "fcp"
                    },
                    order: [
                        ['type', 'ASC'],
                        ['timestamp', 'ASC'],
                    ],
                }),
                ttfb: await models.Measurement.findAll({
                    attributes:["value", "timestamp"],
                    where: {
                        SiteId: req.params.id,
                        timestamp: {
                            [Op.gte]: new Date(req.body.startDate),
                            [Op.lte]: new Date(req.body.endDate)
                        },
                        type: "ttfb"
                    },
                    order: [
                        ['type', 'ASC'],
                        ['timestamp', 'ASC'],
                    ],
                })
            };

            models.Site.findOne({
                where: {
                    id: req.params.id
                }
            }).then((response) => {
                if (response) {
                    res.status(200).json(data);
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
