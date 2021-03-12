const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;
let i = 0;
let body = null;

app.get("/", (req, res) => {
  if (body) res.send(body);
  else res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Access the parse results as request.body
app.post("/", function (req, res) {
  body = req.body;
});

setInterval(
  () =>
    axios.post("http://localhost:3000", {
      iteration: i++,
    }),
  2000
);
