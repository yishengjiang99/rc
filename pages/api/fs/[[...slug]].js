const fs = require("fs");
const Path = require("path");
const { execSync } = require("child_process");
const { ls } = require("../../../lib/posts");
export default (req, res) => {
  console.log(req.query);
  console.log(req.params);
  res.json(ls(req.query["[...slug]"]));
};
//  res.json(require("../../../lib/posts").ls(req.query.path.join("/")));
