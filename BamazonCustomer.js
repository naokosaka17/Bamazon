var mysql = require('mysql');
var inquirer = require('inquirer');


var connection = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : '',
  database : 'Bamazon'
});
 
connection.connect();




////////// 

connection.query('SELECT ItemID, ProductName, Price FROM Bamazon.products', function(err, rows, fields) {
  if (err) throw err;
 console.log(rows);
});


//////////

var inquirer = require("inquirer");

var questions = [
{
  type: "input",
  name: "ItemID",
  message: "Which product do you want? enter by ItemID",
  validate: function(value) {
    var pass = value.match(/^\d{2}/);
    if (pass) {
      return true;

    } else {
      return "Please enter your favorite product by ID";
    }
  }
}
];

var questions = [
{
  type: "input",
  name: "ItemID",
  message: "How many product do you want?",
  validate: function(value) {
    var pass = value.match(/^\d{2}/);
    if (pass) {
      return true;

    } else {
      return "Please enter ";
    }
  }
}
];

inquirer.prompt(questions, function(answers) {
  console.log( JSON.stringify(answers, null, "  ") );
});
 
connection.end();