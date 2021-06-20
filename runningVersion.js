import express from "express";
import fs from "fs/promises";

let keywordCounts;
// fs.readFile("Text.txt", "utf8", (error, data) => {
//   //   console.log(data);
//   var count = (data.match(/Lorem/gi) || []).length;
//   //   console.log(count);
//   keywordCounts = count;
// });

let count = "---";
const getCount = async (key) => {
  if (key) {
    console.log("---------------------FS------------------------");
    await fs.readFile("Text.txt", "utf8", (error, data) => {
      let re = new RegExp(key, "gi");
      //   console.log(re);
      count = (data.match(re) || []).length;
      console.log("19", count);
    });
    return count;
  } else {
    return "Not Found";
  }
};

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use("/", (req, res) => {
  //   res.json(keywordCounts);
  console.log("GC", getCount(req.query.keyword));
  console.log(req.query.keyword);
  res.json(count);
});

app.listen(5000, () => {
  console.log(`Server running on http://localhost:${"5000"}`);
});
