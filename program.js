const express = require("express");
const app = express();
const path = require("path");
const bodyparser = require("body-parser");

app.use(express.static(process.argv[3] || path.join(__dirname, "public")));
app.use(bodyparser.urlencoded());

app.set("views", path.join(__dirname, "templates"));
app.set("view engine", "pug");

app.get("/home", (req, res) => {
  res.render("index", { date: new Date().toDateString() });
});

app.get("/form", (req, res) => {
  res.render("form");
});

app.post("/form", (req, res) => {
  res.end(
    req.body.str
      .split("")
      .reverse()
      .join("")
  );
});

app.listen(process.argv[2]);
