import express from "express";
import fs from "fs";
import util from "util";

const readFile = util.promisify(fs.readFile); // For Async Operations

// Determine function
const getCount = async (key, fileName) => {
  try {
    const data = await readFile(`./files/${fileName}.txt`, "utf8");
    // console.log(fileName);
    let re = new RegExp(key, "gi");
    let count = (data.match(re) || []).length;
    return { count: count, message: "OK" };
  } catch (error) {
    return { count: 0, message: "There is no such file or directory " };
  }
};

const app = express();
app.use(express.urlencoded({ extended: true })); // Convert to json

app.use("/", (req, res) => {
  //   console.log(req._parsedUrl.pathname.replace(".json", ""));
  if (req._parsedUrl.pathname.includes("json")) {
    // Call Function
    getCount(
      req.query.keyword,
      req._parsedUrl.pathname.replace(".json", "").replace("/", "")
    ).then((data) => {
      let result = { keyword: req.query.keyword, data };
      res.send(result);
    });
  }
});

const PORT = 8080;
app.listen(8080, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
