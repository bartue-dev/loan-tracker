const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/", );


const PORT = 3000;
app.listen(PORT, () => {
  console.log("Listening to PORT: " + PORT);
});

