const db = require("../db/queries");
const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const { validateAddForm, validateEditForm } = require("../errorHandler/validator")

//get all data
exports.getListOfPersons = asyncHandler(async (req, res, next) => {
  const listOfPersons = await db.getListOfPersons();

  res.render("index", {
    title: "List of Persons",
    listPersons: listOfPersons,
  });
});

//render person form
exports.getAddPersonForm = asyncHandler(async (req, res, next) => {
  res.render("addPerson", {
    title: "Add",
    errors: []
  });
});

//add data
exports.postAddPerson = [ validateAddForm, asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("addPerson", {
      title: "Add",
      errors: errors.array()
    });
  } else {
    const { firstname, lastname, address, phone_number, amount } = req.body;
  
    await db.addPerson({firstname, lastname, address, phone_number, amount});

    res.redirect("/");
  }
})
];

//delete single data
exports.postDeletePerson = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  await db.deletePerson(id);

  res.redirect("/");
});

//render edit form
exports.getEditForm = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const personDetails = await db.getEditForm(id);

  console.log("personal details: ", personDetails);
  

  res.render("editPerson", {
    title: "Edit",
    details: personDetails,
    errors: []
  });
});

//edit or update data
exports.postEditPerson = [ validateEditForm, asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  const { id } = req.params;
  const { firstname, lastname, address, phone_number } = req.body;

  console.log("post edit:", req.body);
  
  const personDetails = await db.getEditForm(id)

  if (!errors.isEmpty()) {
    return res.status(400).render("editPerson", {
      title: "Edit",
      details: personDetails,
      errors: errors.array()
    });
  } else {
  
    console.log("req query: ", req.body);
  
    await db.editPerson(id, { firstname, lastname, address, phone_number })
    
    res.redirect("/");
  }
})
];

//get specific data
exports.getPersonDetails = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const details = await db.getDetails(id);

  console.log("details: ", details);
  

  res.render("viewDetails", {
    title: "Details",
    details: details
  });
});

//render specific row data to the page
exports.getPayPersonDetails = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const details = await db.getDetails(id)

  res.render("pay", {
    title: "Payment",
    details: details
  });
});

//add pay_amount and update the amount by subtracting the pay_amount
exports.postPayPersonDetails = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { pay_amount } = req.body;

  await db.pay(id, pay_amount);

  res.redirect("/");
});

//get the searchName then render it to the search page
exports.getSearchDetails = asyncHandler(async (req, res, next) => {
  const { searchName } = req.query;
  let details;
  if(searchName) {
    details = await db.getSearchDetails(searchName);
  }
  console.log("Searched name:", searchName);
  console.log("Search data: ", details);
  

  res.render("searchPerson", {
    title: "Search",
    details: details
  });
});