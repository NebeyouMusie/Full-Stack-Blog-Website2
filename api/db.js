import mysql from "mysql2"


export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "4Neba1994?",
  database: "blog",
});