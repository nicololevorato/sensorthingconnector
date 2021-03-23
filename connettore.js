const express = require("express");
const axios = require("axios");
const app = express();
const sqlite3 = require("sqlite3").verbose();
const port = 3000;
let i = 0;

let db = new sqlite3.Database("idsensor.db", sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the idsensor database.");
});

app.listen(port, function () {
  console.log("Server started on port " + port);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Access the parse results as request.body
app.post("/", function (req, res) {
  db.get(
    "SELECT brand FROM sensor WHERE id=" + req.body.id,
    [],
    (err, rows) => {
      if (err) {
        throw err;
      }
      console.log(rows.brand);
    }
  );
});

setInterval(
  () =>
    axios.post("http://localhost:3000", {
      id: 1,
      payload: 1,
    }),
  2000
);
