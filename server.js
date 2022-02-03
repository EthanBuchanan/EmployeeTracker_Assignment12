const inquirer = require("inquirer");
const mysql = require("mysql2/promise");

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'passphrase',
      database: 'employee_db'
    },
  );

const execute = async (data) => {
    return await (await db).execute("SELECT * FROM employees;");
}

const main = async () => {
  const query = await execute("SELECT * FROM employees;");
  
  console.log(query);
};


main();