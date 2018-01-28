const express = require("express");
const app = express();
const path = require("path");
const bodyparser = require("body-parser");

app.use(
  require("stylus").middleware(
    process.argv[3] || path.join(__dirname, "public")
  )
);
app.use(express.static(process.argv[3] || path.join(__dirname, "public")));
app.use(bodyparser.urlencoded());

app.set("views", path.join(__dirname, "templates"));
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.end("main.css");
});

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

app.put("/message/:id", (req, res) => {
  const id = req.params.id;

  res.end(
    require("crypto")
      .createHash("sha1")
      .update(new Date().toDateString() + id)
      .digest("hex")
  );
});

app.get("/search", (req, res) => {
  res.end(JSON.stringify(req.query));
});

app.listen(process.argv[2]);
