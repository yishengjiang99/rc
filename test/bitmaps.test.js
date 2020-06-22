import Bitmaps from "../components/bitmaps.js";
import chai from "chai";
var expect = chai.expect; // Using Expect style
var to = chai.to;
var describe = (str, fn) => {
  console.log(str);
  fn();
};
var it = (str, fn) => {
  console.log(" \t" + str);
  fn();
};
describe("bitmap stores binary bits ", () => {
  it("uses uin16arrays", () => {
    var b = new Bitmaps(30, 12);
    expect(b.bitmap.length).equal(30);
    b.markLit(1, 3);
    b.markLit(1, 1);
    expect(b.isLit(1, 3) === true);
    expect(b.isLit(1, 2) === false);
  });
});
