const pool = require("./pool");

async function getListOfPersons() {
  const { rows } = await pool.query("SELECT persons.person_id, firstname, lastname, address, phone_number, amount FROM persons INNER JOIN loan_amount ON persons.person_id = loan_amount.person_id");
  return rows;
}

async function addPerson({firstname, lastname, address, phone_number, amount}) {

  const addPerson = await pool.query("INSERT INTO persons(firstname, lastname, address, phone_number) VALUES ($1, $2, $3, $4) RETURNING person_id", [firstname, lastname, address, phone_number]);

  const person_id = addPerson.rows[0].person_id;

  await pool.query("INSERT INTO loan_amount(amount, person_id) VALUES ($1, $2)", [amount, person_id]);
}

async function deletePerson(id) {
  await pool.query("DELETE FROM loan_amount WHERE person_id = $1", [id]);
  await pool.query("DELETE FROM persons WHERE person_id = $1", [id]);
}

async function editPerson(id, {firstname, lastname, address, phone_number}) {
  await pool.query("UPDATE persons SET firstname = $1 , lastname = $2, address = $3, phone_number = $4 WHERE person_id = $5", [firstname, lastname, address, phone_number, id]);
}

async function getEditForm(id) {
  const {rows} = await pool.query("SELECT person_id, firstname, lastname, address, phone_number FROM persons WHERE person_id = $1", [id]);

  return rows[0]
}

async function getDetails(id) {
  const { rows } = await pool.query("SELECT persons.person_id, firstname, lastname, address, phone_number, amount FROM persons INNER JOIN loan_amount ON loan_amount.person_id = persons.person_id WHERE persons.person_id = $1", [id]);

  return rows[0];
}

async function pay(id, payAmount) {
  await pool.query("UPDATE loan_amount SET amount = (amount - $1), pay_amount = (pay_amount + $1) WHERE person_id = $2", [payAmount, id]);
}

async function getSearchDetails(searchName) {

  try {
    const nameLower = searchName.toLowerCase();
    const { rows } = await pool.query("SELECT firstname, lastname, address, phone_number, amount FROM persons INNER JOIN loan_amount ON persons.person_id = loan_amount.person_id WHERE LOWER(firstname) LIKE $1", [`${nameLower}%`]);
  
    return rows[0];

  } catch (error) {
    console.log(`getSearchDetails error: ${error}`);
    
  }
}

module.exports = {
  getListOfPersons,
  addPerson,
  deletePerson,
  editPerson,
  getEditForm,
  getDetails,
  pay,
  getSearchDetails
}