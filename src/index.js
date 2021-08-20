const express = require("express");
const cors = require("cors");
const path = require("path");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use("/", express.static(path.resolve("public")));
app.use(bodyParser.json());

// const openAPIURL = "https://open-api-dev.ifyoucan.com"
// const openAPIURL = "http://localhost:3000";
const openAPIURL = "https://munission-demo.vercel.app";

const apiClient = {
  issueOneTimeToken: (apiKey, username) =>
    fetch(openAPIURL + "/v1/api/token", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ apiKey, email: username }),
    }),
};

app.get("/api/messagespring/:apiKey/:username", (req, res) => {
  console.log(JSON.stringify(process.env))
  apiClient
    .issueOneTimeToken(req.params.apiKey, req.params.username)
    .then((response) => {
      if (!response.ok) {
        return res.redirect("/error.html");
      }
      return response.json()
        .then(json => {
          res.redirect("/success.html?" + json.token);
        })
    });
});

app.post("/v1/api/token", (req, res) => {
  if (req.body.apiKey !== "abc" || req.body.email !== "def") {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }
  res.json({
    token: "one-time-token",
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Application is running at ${port}`);
});
