const request = require("supertest");
const expect = require("chai").expect;
const {Op} = require('sequelize')
const models = require('../src/models');
const app = require("../src/app");

describe("api/v1/client-side", () => {
    describe("measures", () => {
        describe("POST/", () => {
            it("should return 200 success when valid object is passed", async () => {
                let uuid =  require('crypto').randomBytes(64).toString('base64');
                const site = models.Site.findOrCreate({
                    where: {webAdress: "http://www.test.com/"}
                }).spread(async (site, created) => {
                    if (created) {
                        site.set("uuId", uuid);
                        site.save();
                    }
                    const res = await request(app).post("/api/v1/client-side/measures")
                        .set('Authorization', 'Bearer ' + site.uuId)
                        .send({
                            metrics: [
                                {
                                    "type": "ttfb",
                                    "value": "200.3455665",
                                    "timestamp": "2020-05-30T13:57:56.035Z"
                                },
                            ],
                        });
                    expect(res.status).to.equal(200);
                });
            });

            it("should return 400 when analytics data is not passed", async () => {
                let uuid =  require('crypto').randomBytes(64).toString('base64');
                const site = models.Site.findOrCreate({
                    where: {webAdress: "http://www.test.com/"}
                }).spread(async (site, created) => {
                    if (created) {
                        site.set("uuId", uuid);
                        site.save();
                    }
                    const res = await request(app).post("/api/v1/client-side/measures")
                        .set('Authorization', 'Bearer ' + site.uuId)
                    expect(res.status).to.equal(400);
                });


            });

            it("should return 401 error when there is no token", async () => {
                const res = await request(app).post("/api/v1/client-side/measures")
                    .send({
                        metrics: [
                            {
                                "type": "ttfb",
                                "value": "200.3455665",
                                "timestamp": "2020-05-30T13:57:56.035Z"
                            },
                        ]
                    });
                expect(res.status).to.equal(401);
            });

            it("should return 401 error when there is invalid token", async () => {
                let uuid =  require('crypto').randomBytes(64).toString('base64');

                const res = await request(app).post("/api/v1/client-side/measures")
                    .set('Authorization', 'Bearer ' + uuid)
                    .send({
                        metrics: [
                            {
                                "type": "ttfb",
                                "value": "200.3455665",
                                "timestamp": "2020-05-30T13:57:56.035Z"
                            },
                        ]
                    });
                expect(res.status).to.equal(401);
            });
        });
    });
});
