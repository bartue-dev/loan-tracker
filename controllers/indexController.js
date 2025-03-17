const asyncHandler = require("express-async-handler");

exports.getAllName = asyncHandler(async (req, res) => {
  res.send("Let's go!!");
});