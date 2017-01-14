// npm install mysql and prompt
var mysql = require('mysql');
var prompt = require('prompt');

// create a connection with mySQL
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", //Your username
    password: "", //Your password
    database: "bamazon"
});

// connect to mySQL.
// connection is an object
connection.connect();

connection.query('SELECT itemID, productName, price FROM products',function(err,rows){
  if(err) throw err;

  console.log("\nitemID\t\tproductName\t\tprice");
  for(var i = 0; i < rows.length; i++) {
    console.log(rows[i].itemID + '\t\t' + rows[i].productName + '\t\t$' + rows[i].price + '\t\t');
  }


//===============================================================

  console.log("\nWhich one would you like to buy?\nPlease enter the Item ID and quantity");
  prompt.start();
  prompt.get(['ItemID', 'StockQuantity'], function(err, choice){
    var userID = choice.ItemID;
    var userQuantity = choice.StockQuantity;
    prompt.stop();
    connection.query('SELECT * FROM products WHERE itemID = "' + userID + '"', function(err, product){
      if(product[0].StockQuantity >= userQuantity) {
        var remainder = product[0].StockQuantity - userQuantity;
        connection.query('UPDATE products SET StockQuantity = "' + remainder + '" WHERE ItemID = "' + userID + '"', function(err, result){
          if(err) throw err;
        });
        console.log('You ordered ' + userQuantity + " " + product[0].ProductName);
      console.log('Your total is: $' + product[0].Price * userQuantity + '\nThank you for shopping!');
      connection.end();
    }
      else
      {
        console.log("Sorry, Currently this item is out of stock...");
        connection.end();
      }
    });
  });
});




