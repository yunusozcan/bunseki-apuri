const request = require("supertest");
const expect = require("chai").expect;
const { Op } = require('sequelize')
const models = require('../src/models');
const app = require("../src/app");

describe("api/v1/dashboard", () => {
    describe("measures", () => {
        describe("GET/:id", () => {
            it("should return 200 success when valid object id is passed", async () => {
                const site = await models.Site.findOne({
                    order: [ [ 'createdAt', 'ASC' ]]
                }).then((r) => r);

                const res = await request(app).get("/api/v1/dashboard/measures/" + site.id);
                expect(res.status).to.equal(200);
            });

            it("should return valid data when valid site id is passed", async () => {
                const site = await models.Site.findOne({
                    order: [ [ 'createdAt', 'ASC' ]]
                }).then((r) => r);

                const res = await request(app).get("/api/v1/dashboard/measures/" + site.id);
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property("dom");
                expect(res.body).to.have.property("window");
                expect(res.body).to.have.property("fcp");
                expect(res.body).to.have.property("ttfb");
            });

            it("should return 404 error when invalid site id is passed", async () => {
                const site = await models.Site.findOne({
                    order: [ [ 'createdAt', 'DESC' ]]
                }).then((r) => r);

                const res = await request(app).get("/api/v1/dashboard/measures/" + (site.id + 1));
                expect(res.status).to.equal(404);
            });
        });
        describe("POST/:id", () => {
            it("should return data when valid specific dates is passed", async () => {
                const site = await models.Site.findOne({
                    order: [ [ 'createdAt', 'ASC' ]]
                }).then((r) => r);

                const res = await request(app).post("/api/v1/dashboard/measures/" + site.id)
                    .send({
                        startDate: new Date(new Date() -  24 * 60 * 60 * 1000),
                        endDate: new Date()
                    });

                expect(res.status).to.equal(200);
                expect(res.body).to.have.property("dom");
                expect(res.body).to.have.property("window");
                expect(res.body).to.have.property("fcp");
                expect(res.body).to.have.property("ttfb");
            });

            it("should return 400 when specific dates is not passed", async () => {
                const site = await models.Site.findOne({
                    order: [ [ 'createdAt', 'ASC' ]]
                }).then((r) => r);

                const res = await request(app).post("/api/v1/dashboard/measures/" + site.id);
                expect(res.status).to.equal(400);
            });

            it("should return 404 error when invalid site id is passed", async () => {
                const site = await models.Site.findOne({
                    order: [ [ 'createdAt', 'DESC' ]]
                }).then((r) => r);

                const res = await request(app).post("/api/v1/dashboard/measures/" + (site.id + 1))
                    .send({
                        startDate: new Date(new Date() -  24 * 60 * 60 * 1000),
                        endDate: new Date()
                    });
                expect(res.status).to.equal(404);
            });
        });
    });
});
