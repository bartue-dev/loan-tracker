const express = require("express");
const app = express();
const indexRouter = require("./routes/indexRouter");
const path = require("node:path");

//connect ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//connect static files
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

//index route
app.use("/", indexRouter);


const PORT = 3000;
app.listen(PORT, () => {
  console.log("Listening to PORT: " + PORT);
});

