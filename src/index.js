const express = require("express");
const cors = require("cors");
const path = require("path");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const { DateTime } = require("luxon");
const { Promise } = require("node-fetch");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use("/", express.static(path.resolve("public")));
app.use(bodyParser.json());

const openAPIURL = (env) => {
  switch (env) {
    case "prod":
      return "https://open-api.ifyoucan.com";
    case "qa":
      return "https://open-api-qa.ifyoucan.com";
    case "dev":
      return "https://open-api-dev.ifyoucan.com";
    default:
      return "localhost:3001";
  }
};

const dashboardURL = (env) => {
  switch (env) {
    case "prod":
      return "https://dashboard.messagespring.com";
    case "qa":
      return "https://dashboard-qa.messagespring.com";
    case "dev":
      return "https://dashboard-dev.messagespring.com";
    default:
      return "localhost:3001";
  }
};

const apiClient = {
  issueOneTimeToken: (env, apiKey, username) =>
    fetch(openAPIURL(env) + "/v1/api/teams/member/token", {
      headers: {
        "Content-Type": "application/json",
        origin: "https://munission-demo.vercel.app",
      },
      method: "POST",
      body: JSON.stringify({ apiKey, email: username }),
    }),
};

app.get("/api/messagespring/:env/:apiKey/:username", (req, res) => {
  apiClient
    .issueOneTimeToken(req.params.env, req.params.apiKey, req.params.username)
    .then((response) => {
      if (!response.ok) {
        return res.redirect("/error.html");
      }
      return response.json().then((json) => {
        const params = new URLSearchParams({
          token: json.hash,
          ma_mode_key: createMaintenanceModeKey(),
        });
        const url = new URL("sso", dashboardURL(req.params.env));
        url.search = params;
        res.redirect(url.toString());
      });
    });
});

function createMaintenanceModeKey() {
  let today = DateTime.utc().toFormat("yyyyMMdd");
  let MA_KEY = `nebular::${today}`;
  return bcrypt.hashSync(MA_KEY, 10);
}

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

app.post("/v1/api/team-member", (req, res) => {
  if (req.body.token !== "one-time-token") {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }
  return res.json({
    accessToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjg4MCwiaWF0IjoxNjI5NDQ4NDkzLCJleHAiOjE2Mjk0NTIwOTMsInN1YiI6IkFjY2Vzc1Rva2VuIn0.jZT7Ltq3eW_Hggpeh72A1eVX-_g96gjkYp1xWQ-JNhA",
    refreshToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjg4MCwiaWF0IjoxNjI5MTAxOTYzLCJleHAiOjE2MzE4MDE5NjMsInN1YiI6IlJlZnJlc2hUb2tlbiJ9.cwL5nimHv5fp1ojFWmO6cktYpFEbra9AqQl8pjQ3BxI",
    expiresIn: 3600,
  });
});

app.listen(port, () => {
  console.log(`Application is running at ${port}`);
});
