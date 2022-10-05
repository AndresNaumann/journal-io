const express = require("express");
let app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/"));

const knex = require("knex")({
  client: "pg",
  connection: {
    host: "localhost",
    user: "postgres",
    password: "Jewish66",
    database: "journals",
    port: 5432,
  },
});

app.get("/", (req, res) => {
  res.redirect("journal");
});

app.get("/journal", (req, res) => {
  knex
    .select()
    .from("entries")
    .then((result) => {
      res.render("journal", { aEntries: result });
    });
});

app.get("/addentry", (req, res) => {
  res.render("addentry");
});

app.get("/edit/:entryid", (req, res) => {
  knex
    .select()
    .from("entries")
    .where("entry_id", req.params.entryid)
    .then((result) => {
      res.render("editEntry", { aEntries: result });
    });
});

app.post("/edit/:entryid", (req, res) => {
  knex("entries")
    .where("entry_id", req.params.entryid)
    .update({
      date: req.body.date,
    })
    .then((result) => {
      res.redirect("/journal");
    });
});

app.post("/journal", (req, res) => {
  let sText = req.body.text;
  let dateTime = req.body.date;

  knex("entries")
    .insert({
      text: sText,
      date: dateTime,
    })
    .then((results) => {
      res.redirect("/journal");
    });
});

// localhost:3000
app.listen(3000);
