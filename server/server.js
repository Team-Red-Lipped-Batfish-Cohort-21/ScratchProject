const express = require("express");
const path = require("path");
const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/build", express.static(path.join(__dirname, "../build")));
app.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname, "../index.html"));
});

app.listen(PORT, console.log(`listening on port ${PORT}`));
