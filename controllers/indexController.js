const db = require("../db/queries");
const asyncHandler = require("express-async-handler");


exports.getListOfPersons = asyncHandler(async (req, res) => {
  const listOfPersons = await db.getListOfPersons();

  console.log(listOfPersons);
  
  res.render("index", {
    title: "List of Persons",
    listPersons: listOfPersons
  })
});