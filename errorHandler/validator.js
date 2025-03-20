const { body } = require("express-validator");

const alphaErr = "must only contain letter.";
const emptyError = "must not be empty";
const phoneError = "must contain 11 digit.";

const validateInputs = [
  body("firstname").trim()
    .notEmpty().withMessage(`First name ${emptyError}`)
    .matches(/^[a-zA-Z\s]*$/).withMessage(`First name ${alphaErr}`),
  body("lastname").trim()
    .isAlpha().withMessage(`Last name ${alphaErr}`)
    .notEmpty().withMessage(`Last name ${emptyError}`),
  body("address").trim()
    .notEmpty().withMessage(`Address ${emptyError}`),
  body("phone_number").trim()
    .isLength({ min: 11, max: 11 }).withMessage(`Phone # ${phoneError}`)
    .notEmpty().withMessage(`Phone # ${emptyError}`),
];

module.exports = {validateInputs};