var config = require('./Unsolved/config');
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: config.pass,
    database: "top_songsdb"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});

function start() {
    inquirer
        .prompt({
            name: "options",
            type: "rawlist",
            message: "What would you like to do?",
            choices: ["See all data for a specific artist", "See all artists who appear within the top 5000 more than once",
                "See all data contained within a specific range", "See all data for a specific song"]
        })
        .then(function (answer) {
    
            if (answer.options === "See all data for a specific artist") {
                specificArtist();
            } else if (answer.options === "See all artists who appear within the top 5000 more than once") {
                top5000Artists();
            } else if (answer.options === "See all data contained within a specific range") {
                specificRange();
            } else if (answer.options === "See all data for a specific song") {
                specificSong();
            }
            else {
                console.log("Please select one of the four options.")
            }
        });
};

function specificArtist() {
    inquirer
        .prompt({
            name: "artist",
            type: "input",
            message: "What artist would you like to search for?"
        })
        .then(function (answer) {
            answer = JSON.stringify(answer.artist);
            console.log(answer);
            connection.query("SELECT * FROM top_5000 WHERE artist = " + answer, function (err, results) {
                if (err) throw err;
                console.log(results);
            });
        });
};

function top5000Artists() {
    connection.query("SELECT DISTINCT artist, COUNT(DISTINCT song) FROM top_5000 GROUP BY artist HAVING COUNT(DISTINCT song) > 1", function (err, results) {
        if (err) throw err;
        console.log(results);
    });
};

function specificRange() {
    inquirer
        .prompt([
            {
                name: "start",
                type: "input",
                message: "Enter starting position: ",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "end",
                type: "input",
                message: "Enter ending position: ",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (answer) {
            console.log(answer);
            connection.query("SELECT * FROM top_5000 WHERE id BETWEEN " + answer.start + " AND " + answer.end, function (err, results) {
                if (err) throw err;
                console.log(results);
            });
        });
};

function specificSong() {
    inquirer
        .prompt({
            name: "song",
            type: "input",
            message: "Which songwould you like to search for? Make sure to type in the full name of the song."
        })
        .then(function (answer) {
            answer = JSON.stringify(answer.song);
            console.log(answer);
            connection.query("SELECT * FROM top_5000 WHERE song = " + answer, function (err, results) {
                if (err) throw err;
                console.log(results);
            });
        });
};


