const pool = require("./pool");

async function getListOfPersons() {
  const { rows } = await pool.query("SELECT firstname, lastname, address, phone_number, amount FROM persons INNER JOIN loan_amount ON persons.person_id = loan_amount.loan_id");
  return rows;
}

module.exports = {
  getListOfPersons
}