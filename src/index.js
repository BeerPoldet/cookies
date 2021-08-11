const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require('cors');

const app = express();

app.use(cors());
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(cookieParser());

app.post("/verify", (req, res) => {
  let options = {
    maxAge: 1000 * 60 * 15, // would expire after 15 minutes
    httpOnly: true, // The cookie only accessible by the web server
    // signed: true, // Indicates if the cookie should be signed
  };

  // Set cookie
  res.cookie("cookieName", "cookieValue", options);
  console.log(req.cookies);
  res.end();
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Application is running at ${port}`);
});
