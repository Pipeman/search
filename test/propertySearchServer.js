const chaiHttp = require('chai-http');
const server = require('../propertySearchServer');
const { expect } = chai = require('chai');

chai.use(chaiHttp);

describe("propertySearch", function () {
  describe("/GET search", function () {
    describe("when searching something different from 'N11'", function () {
      it("should respond with empty listings", function (done) {
        chai.request(server)
          .get("/search?q=SE1")
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a("object");
            done();
          });
      });
    });
  });

  describe("when accessing an unmapped URL", function() {
    it("should return a 404 with an error message", function(done) {
      chai.request(server)
        .get("/qwerty")
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(JSON.parse(res.text).message).to.be.equal("Requested page not found");
          done();
        });
    });
  });
});