const request = require("supertest");
const expect = require("chai").expect;
const {Op} = require('sequelize')
const models = require('../src/models');
const app = require("../src/app");

describe("api/v1/client-side", () => {
    describe("measures", () => {
        describe("POST/", () => {
            it("should return 200 success when valid object id is passed", async () => {
                const site = await models.Site.findOne({
                    order: [['createdAt', 'ASC']],
                    include    : [{ model: models.Measurement, attributes: ["type","value", "timestamp"]}]
                }).then((r) => r);

                console.log(site);
                const res = await request(app).post("/api/v1/client-side/measures")
                    .send({
                        uuId: site.uuId,
                        data: site.Measurements,
                    });
                expect(res.status).to.equal(200);
            });

            it("should return 400 when analytics data is not passed", async () => {
                const res = await request(app).post("/api/v1/client-side/measures");
                expect(res.status).to.equal(400);
            });

            it("should return 404 error when invalid site uuId is passed", async () => {
                const res = await request(app).post("/api/v1/client-side/measures")
                    .send({
                        uuId: "TC-999999",
                        data: [
                            {
                                "type": "ttfb",
                                "value": "200.3455665",
                                "timestamp": "2020-05-30T13:57:56.035Z"
                            },
                        ]
                    });
                expect(res.status).to.equal(404);
            });
        });
    });
});
