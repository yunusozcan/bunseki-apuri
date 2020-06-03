const request = require("supertest");
const expect = require("chai").expect;
const { Op } = require('sequelize')
const models = require('../src/models');
const app = require("../src/app");

describe("api/v1/dashboard/", () => {
    describe("list", () => {
        describe("GET/", () => {
            it("should return site array", async () => {
                const sites = await models.Site.findAll({
                    attributes: ['id', 'webAdress']
                }).then((r) => r);

                const res = await request(app).get("/api/v1/dashboard/list/");
                expect(res.status).to.equal(200);
                expect(res.body.length).to.equal(sites.length);

            });
        });
    });
});
