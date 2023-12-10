const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "dist/budget-app")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "dist/budget-app", "index.html"));
});

app.listen(3001, () => {
  console.log("Server started !!! at " + 3001);
});
