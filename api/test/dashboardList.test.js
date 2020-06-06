const request = require("supertest");
const expect = require("chai").expect;
const { Op } = require('sequelize')
const models = require('../src/models');
const app = require("../src/app");

describe("api/v1/dashboard/", () => {
    describe("sites", () => {
        describe("GET/", () => {
            it("should return site array", async () => {
                let uuid =  require('crypto').randomBytes(64).toString('base64');
                const site = await models.Site.findOrCreate({
                    where: {webAdress: "http://www.test.com/"}
                }).spread((site, created) => {
                    if (created) {
                        site.set("uuId", uuid);
                        site.save();
                    }
                    return site;
                });

                const sites = await models.Site.findAll({
                    attributes: ['id', 'webAdress']
                }).then((r) => r);

                const res = await request(app).get("/api/v1/dashboard/sites/");
                expect(res.status).to.equal(200);
                expect(res.body.length).to.equal(sites.length);

            });

        });
        describe("POST/", () => {
            it("should save new site and return api key", async () => {
                let uuid =  require('crypto').randomBytes(64).toString('base64');
                uuid = await models.Site.findOrCreate({
                    where: {webAdress: "http://www.test.com/"}
                }).spread((site, created) => {
                    if (created) {
                        site.set("uuId", uuid);
                        site.save();
                    }
                    return site.uuId;
                });
                const res = await request(app).post("/api/v1/dashboard/sites/new")
                    .send({
                        site: 'http://www.test.com/',
                    });

                expect(res.status).to.equal(200);
                expect(res.body.key).to.equal(uuid);
            });
        });
    });
});
