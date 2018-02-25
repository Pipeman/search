const { expect } = require("chai");
const { getPropertyList, search } = require("../propertyActionService");

describe("search()", function () {
  describe("when the searched area has results", function () {
    beforeEach(function () {
      this.searchedArea = "N11";
      this.result = search(this.searchedArea);
    });

    it("should return properties in the searched area", function () {
      expect(this.result.area).to.be.equal(this.searchedArea);
    });

    it("should return a list of properties", function () {
      expect(this.result.result_count).to.be.equal(5);
      expect(this.result.listing.length).to.be.equal(5);
    });
  });

  describe("when there are no results for the searched area", function() {
    beforeEach(function() {
      this.searchedArea = "SE1";
      this.result = search(this.searchedArea);
    });

    it("should return properties in the searched area", function() {
      expect(this.result.area).to.be.equal(this.searchedArea);
    });

    it("should return an empty list of properties", function () {
      expect(this.result.result_count).to.be.equal(0);
      expect(this.result.listing.length).to.be.equal(0);
    });
  });

  describe("when the searched area is undefined", function() {
    beforeEach(function() {
      this.result = search(undefined);
    });

    it("should return properties in the searched area", function() {
      expect(this.result.area).to.be.equal("");
    });

    it("should return an empty list of properties", function () {
      expect(this.result.result_count).to.be.equal(0);
      expect(this.result.listing.length).to.be.equal(0);
    });
  });
});