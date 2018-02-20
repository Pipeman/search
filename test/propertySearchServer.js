const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../propertySearchServer');
const { expect } = chai;

chai.use(chaiHttp);

describe("propertySearch", function () {
  describe("/GET search", function () {
    describe("when not specifying a query string", function (done) {
      it("should respond with a HTTP 404", function () {
        chai.request(server)
          .get("/search")
          .end((err, res) => {
            expect(res).to.have.status(404);
          });
      });
    });

    describe("when searching something different from 'N11'", function (done) {
      it("should respond with a HTTP 404", function () {
        chai.request(server)
          .get("/search?q=SE1")
          .end((err, res) => {
            expect(res).to.have.status(404);
          });
      });
    });

    describe("when searching for 'N11'", function (done) {
      it("should respond with a HTTP 404", function () {
        chai.request(server)
          .get("/search?q=N11")
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a("object");
            expect(res.body.listings.length).to.be.equal(5);
          });
      });
    });
  });
});