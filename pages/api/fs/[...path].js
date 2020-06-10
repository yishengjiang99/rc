const fs = require("fs");
const Path = require("path");
const { execSync } = require("child_process");

export default (req, res) => {
  const uri = req.query.path.join("/");

  try {
    const output = execSync(`ls ${uri} |grep mp3`, {
      cwd: Path.join(process.cwd(), "public"),
    })
    .toString()
    .trim()
    .split("\n")
    .map((file) => uri + "/" + file);
    res.json(output);
  } catch (e) {
    res.json([]);
  }

};
