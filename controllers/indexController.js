const db = require("../db/queries");
const asyncHandler = require("express-async-handler");


exports.getListOfPersons = asyncHandler(async (req, res) => {
  const listOfPersons = await db.getListOfPersons();

  console.log(listOfPersons);
  
  res.render("index", {
    title: "List of Persons",
    listPersons: listOfPersons
  });
});

exports.getAddPersonForm = asyncHandler(async (req, res) => {
  res.render("addPerson");
});

exports.postAddPerson = asyncHandler(async (req, res) => {
  const { firstname, lastname, address, phone_number, amount } = req.body;

  await db.addPerson({firstname, lastname, address, phone_number, amount});

  res.redirect("/")
});

exports.postDeletePerson = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await db.deletePerson(id);

  res.redirect("/")
});