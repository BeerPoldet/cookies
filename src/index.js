const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use("/public", express.static(path.resolve("public")));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Application is running at ${port}`);
});
