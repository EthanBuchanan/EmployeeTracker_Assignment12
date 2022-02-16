var inquirer; 
var mysql; 

var db; 

const execute = async (data) => {
    return await (await db).execute(data);
};

const fillSpace = (text, length) => {

  let output = ""+text;

  while (output.length < length)
  {
    output += " ";
  }

  return output;
};

const tableDisplay = ( data) => {

  //console.log(data);


  // establish column widths
  const widths = []
  //let width = 0;
  const colDivider = " | ";

  for (let i = 0; i < data[1].length; i++)
  {
    widths.push(data[1][i].name.length);
  }
  
  for (let i = 0; i < data[0].length; i++)
  {
    for (let j = 0; j < data[1].length; j++)
    {
      if (widths[j] < data[0][i][data[1][j].name].length)
      {
        widths[j] = data[0][i][data[1][j].name].length;
      }
    }
  }
  
  // make horizontal bar

  let horBar = " +";

  for (let i = 0 ; i < widths.length; i++)
  {
    let tempBar = ""
    while (tempBar.length < widths[i])
    {
      tempBar += "-";
    }
    horBar += tempBar + "--+";
  }

  // print column titles
  let line = colDivider;
  
  for (let i = 0; i < data[1].length; i++)
  {
    line += fillSpace(data[1][i].name, widths[i]);
    line += colDivider;
  }
  console.log("\n\n\n\n\n");
  console.log(horBar);
  console.log(line);
  console.log(horBar);

  // print each row
  
  for (let i = 0; i < data[0].length; i++)
  {
    line = colDivider;
    for (let j = 0; j < data[1].length; j++)
    {
      line += fillSpace(data[0][i][data[1][j].name], widths[j]);
      line += colDivider;
    }
    console.log(line);
  }
  console.log(horBar);

};


const main = async () => {
  inquirer = require("inquirer");
  mysql = require("mysql2/promise");
  
  db = await mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'passphrase',
      database: 'employee_db'
    },
  );


  const msg = `\n\n\nEnter a number to choose: 
  \t1 - View all departments 
  \t2 - View all roles 
  \t3 - View all employees
  \t4 - Add a department
  \t5 - Add a role
  \t6 - Add an employee
  \t7 - Update an employee's role
  \tQ - Save and Quit
  `;

  
  while (true)
  {
    const inq = await inquirer.prompt([
      {
          type: 'input',
          message: msg,
          name: 'output'
      }
    ]);

    if (inq.output == "1")
    {
      const data = await execute("SELECT * FROM departments;");
    
      tableDisplay( data);
    }
    else if (inq.output == "2")
    {
      const data = await execute("SELECT * FROM roles;");
    
      tableDisplay( data);
    }
    else if (inq.output == "3")
    {
      const data = await execute("SELECT * FROM employees;");
    
      tableDisplay( data);
    }
    else if (inq.output == "4")
    {
      const promptData = await inquirer.prompt([
        {
          type:"input",
          message:"\n\n\n\n\nEnter the new department's name:\n",
          name:"output"
        }
      ]);

      await execute("INSERT INTO departments (department_name) VALUES (\""+promptData.output+"\");");
    }
    else if (inq.output == "5")
    {
      const promptData = await inquirer.prompt([
        {
          type:"input",
          message:"\n\n\n\n\nEnter job title:\n",
          name:"title"
        },
        {
          type:"input",
          message:"\n\n\n\n\nEnter the id of this role's department:\n",
          name:"deptID"
        },
        {
          type:"input",
          message:"\n\n\n\n\nEnter the new role's salary:\n",
          name:"salary"
        }
      ]);

      const command = "INSERT INTO roles (department_id, job_title, salary) VALUES ("+promptData.deptID+", \"" + promptData.title + "\", " + promptData.salary + ");";

      //console.log(command)

      await execute(command);
    
    }
    else if (inq.output == "6")
    {
      const promptData = await inquirer.prompt([
        {
          type:"input",
          message:"\n\n\n\n\nEnter employee's first name:\n",
          name:"first"
        },
        {
          type:"input",
          message:"\n\n\n\n\nEnter employee's last name:\n",
          name:"last"
        },
        {
          type:"input",
          message:"\n\n\n\n\nEnter the id of the employee's role:\n",
          name:"role"
        },
        {
          type:"input",
          message:"\n\n\n\n\nEnter the id of the employee's manager:\n",
          name:"manager"
        }
      ]);

      const command = "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (\""+promptData.first+"\", \"" + promptData.last + "\", " + promptData.role + ", " + promptData.manager +");";

      //console.log(command)

      await execute(command);
    }
    else if (inq.output == "7")
    {
      const promptData = await inquirer.prompt([
        {
          type:"input",
          message:"\n\n\n\n\nEnter employee id:\n",
          name:"id"
        },
        {
          type:"input",
          message:"\n\n\n\n\nEnter the id of the employee's new role:\n",
          name:"role"
        }
      ]);

      const command = "UPDATE employees SET role_id = " + promptData.role + " WHERE id = " + promptData.id + ";";

      //console.log(command)

      await execute(command);
    }
    else
    {
      break;
    }
  }

  db.end();

  return;
};


main();