#! /usr/bin/env node

const { Client } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const SQL = ` CREATE TABLE IF NOT EXISTS persons(
person_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
firstname VARCHAR(255) NOT NULL,
lastname VARCHAR(255) NOT NULL,
address VARCHAR(255) NOT NULL,
phone_number VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS loan_amount(
loan_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
amount INTEGER NOT NULL,
person_id INTEGER NOT NULL,
CONSTRAINT fk_persons
FOREIGN KEY(person_id)
REFERENCES persons(person_id));

INSERT INTO persons(
firstname,
lastname,
address,
phone_number) VALUES(
'Bart', 'Batiancila', 'Prk. Malabarbas Polomolok South Cotabato', '09105359425');

INSERT INTO loan_amount(amount, person_id) VALUES(5000, 1);
`


async function main() {
  console.log("seeding...");
  const client = new Client({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT
  });

  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();