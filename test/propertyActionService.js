const { expect } = require("chai");
const { getPropertyList, search } = require("../propertyActionService");

describe("search()", function () {
  describe("when searching for 'N11'", function () {
    beforeEach(function () {
      this.result = search("N11");
    });

    it("should return properties in the 'N11' area", function () {
      expect(this.result.area).to.be.equal("N11");
    });

    it("should return a list of properties", function () {
      expect(this.result.listing.length).to.be.equal(5);
    });
  });

  describe("when not searching for 'N11'", function() {
    beforeEach(function() {
      this.result = search("SE1");
    });

    it("should return 404", function() {
      expect(this.result).to.be.equal(404);
    });
  });
});