const express = require("express");
const fs = require("fs");
const cors = require("cors");
const { json } = require("express");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
  res.end("success");
});

app.get("/getdata", function (req, res) {
  fs.readFile("./data.txt", "utf-8", function (err, data) {
    res.end(data);
  });
});

app.post("/save", function (req, res) {
  // reading file
  fs.readFile("./data.txt", "utf-8", function (err, data) {
    console.log(err);
    if (err) {
      res.status(500).send();
      return;
    }

    let todo = [];

    if (data.length > 0) {
      todo = JSON.parse(data);
    }

    todo.push(req.body);

    //write file
    fs.writeFile("./data.txt", JSON.stringify(todo), function (err) {
      res.send("Success");
    });
  });
});

app.post("/update", function (req, res) {
  //write file
  fs.writeFile("./data.txt", JSON.stringify(req.body), (err) => {
    res.send("Success");
  });
});

app.listen(8000, function (err) {
  console.log(`port is listening at 8000`);
});
