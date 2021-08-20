const express = require("express");
const cors = require("cors");
const path = require("path");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use("/", express.static(path.resolve("public")));
app.use(bodyParser.json());

// const openAPIURL = "https://open-api-dev.ifyoucan.com"
const openAPIURL =
  process.env.NODE_ENV !== "production"
    ? `http://localhost:${port}`
    : "https://munission-demo.vercel.app";

const placeAdminURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://notifyme-qa.ifyoucan.com";

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
  apiClient
    .issueOneTimeToken(req.params.apiKey, req.params.username)
    .then((response) => {
      if (!response.ok) {
        return res.redirect("/error.html");
      }
      return response.json().then((json) => {
        res.redirect(placeAdminURL + "/otc-login?token=" + json.token);
      });
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
