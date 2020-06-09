const fs = require("fs");
const Path = require("path");
const { spawn } = require("child_process");

export default (req, res) => {
  const uri = req.query.path.join("/");
  const path = Path.resolve("public", uri);
  const output = execSync(`ls ${path} |grep mp3`).toString().trim().split("\n");
  // output = output.map(file=>"")
  res.json(output);
};
