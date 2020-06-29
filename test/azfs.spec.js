const chai = require("chai");
var expect = chai.expect;

const fs = require("../lib/azfs");

describe("az has a filesystem", function () {
  it("lets you create file", async function () {
    const t = new Date();
    const text = t.toISOString();
    var res = await fs.file_put_contents(`time${t.getSeconds()}.txt`, text);
    expect(res).to.exist;

    var filecontent = fs.file_get_contents(`sounds/time${t.getSeconds()}.txt`);
    expect(filecontent).to.equal(text);
  });

  it("lets you list files", async function () {
    try {
      const files = fs.listFiles("sounds");
    } catch (e) {
      expect(e).to.be.null;
    }
  });
});
