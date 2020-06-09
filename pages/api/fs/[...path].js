const fs = require("fs");
const Path = require("path");
const { execSync } = require("child_process");
export default (req, res) => {
  const uri = req.query.path.join("/");
  const output = execSync(`ls ${uri} |grep mp3`, {
    cwd: Path.resolve("public"),
  })
    .toString()
    .trim()
    .split("\n")
    .map((file) => uri + "/" + file);
  res.json(output);
};
