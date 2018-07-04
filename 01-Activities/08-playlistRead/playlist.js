var config = require('./config');
var mysql = require("mysql");

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
    connection.query("SELECT * FROM favorite_db.favorite_songs", function (err, res) {
        if (err) throw err;
        for (var i=0; i < res.length; i++) {
            console.log(res[i].song + " | " + res[i].artist + " | " + res[i].score);
        }
        connection.end();
    });
};