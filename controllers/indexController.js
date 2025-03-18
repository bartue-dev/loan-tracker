const { render } = require("ejs");
const db = require("../db/queries");
const asyncHandler = require("express-async-handler");


exports.getListOfPersons = asyncHandler(async (req, res) => {
  const listOfPersons = await db.getListOfPersons();

  res.render("index", {
    title: "List of Persons",
    listPersons: listOfPersons,
  });
});

exports.getAddPersonForm = asyncHandler(async (req, res) => {
  res.render("addPerson", {
    title: "Add"
  });
});

exports.postAddPerson = asyncHandler(async (req, res) => {
  const { firstname, lastname, address, phone_number, amount } = req.body;

  await db.addPerson({firstname, lastname, address, phone_number, amount});

  res.redirect("/")
});

exports.postDeletePerson = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await db.deletePerson(id);

  res.redirect("/");
});

exports.getEditForm = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const personDetails = await db.getEditForm(id);

  console.log("personal details: ", personDetails);
  

  res.render("editPerson", {
    title: "Edit",
    details: personDetails
  });
});

exports.postEditPerson = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, address, phone_number } = req.body;

  console.log("req query: ", req.body);

  await db.editPerson(id, { firstname, lastname, address, phone_number })
  
  res.redirect("/");
});

exports.getPersonDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const details = await db.getDetails(id);

  console.log("details: ", details);
  

  res.render("viewDetails", {
    title: "Details",
    details: details
  });
})