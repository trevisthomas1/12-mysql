var config = require('./config');
var mysql = require("mysql");
// var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: config.pass,
    database: "favorite_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
});

function afterConnection() {
    connection.query("SELECT * FROM favorite_db.favorite_soda", function (err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    });
};
