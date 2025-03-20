const express = require("express");
const app = express();
const path = require("node:path");

const indexRouter = require("./routes/indexRouter");

//connect ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//to turn req.body into object
app.use(express.urlencoded({extended: true}))

//connect static files
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

//index route
app.use("/", indexRouter);

//error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error!"})
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Listening to PORT: " + PORT);
});

