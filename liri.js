require("dotenv").config();

//code to import keys js stored into a variable
var keys = require("./keys.js");

//Using the Spotify api and getting the key from keys.js
var Spotify = require('node-spotify-api');

//load the spotify keys
var spotify = new Spotify(keys.spotify);

//Required to use moment for node
var moment = require('moment');
moment().format();

//Axios package
var axios = require("axios");
// Load the fs package to read and write
var fs = require("fs");

var logline = "------------------------------------------------------------";

// Take two arguments.
// The first will be the action (i.e. "concert", "spotify", etc.)
// The second will be the value/name of band/song/movie
var action = process.argv[2];
var value = process.argv.slice(3).join(" ");


// switch-case will direct which function gets run.
switch (action) {
    case 'concert-this':
        concert(value);
        break;

    case 'spotify-this-song':
        spotify(value);
        break;

    case 'movie-this':
        omdb(value);
        break;

    case 'do-what-it-says':
        doWhatItSays(value);
        break;
    default:
        console.log("Invalid action. Please enter one of the following: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says")
}



function logData(data) {
    fs.appendFile("log.txt", data, function (error) {
        if (error) throw error;
    });
}


//Funtion for concert-this Bands in Town API
function concert() {
    var actionText = ('\n' + logline + '\n' + action + " : " + value + '\n' + logline);

    console.log("\n" + actionText);
    logData("\n" + actionText);

    var queryUrl = "https://rest.bandsintown.com/artists/" + value + "/events?app_id=" + keys.bandsintown.id;

    axios.get(queryUrl).then(
        function (response, error) {
            var data = response.data;

            if (!error && data.length > 0) {

            var introText = ('Upcoming concerts for ' + value + ":\n");
            console.log(introText);
            logData("\n" + introText);

            for (var i = 0; i < 3 && i < data.length; i++) {
                var concertData = [
                    "Venue Name: " + data[i].venue.name,
                    "Venue Location: " + data[i].venue.city + ', ' + data[i].venue.country,
                    "Date of the Event: " + moment(data[i].datetime).format("MM/DD/YYYY")
                ].join("\n");

                console.log(concertData + "\n");
                logData("\n" + concertData + "\n");
            }
        } else {
            var nullText = ("\nSorry, it doesn't look like that artist is on the road. Please search again...\n");
            console.log(nullText);
            logData("\n" + nullText);
        }
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                var reqText = "\nBad request. Check your search and please search again...\n"
                console.log(reqText);
                logData(reqText)
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                var errText = "\nSorry, that artist couldn't be found. Please search again...\n"
                console.log(errText);
                logData(errText)
                // console.log("Error", error.message);
                // logData(errText + error.message);
            }
            // console.log(error.config);
        });
}


function omdb(value) {

    if (!value) {
        value = "Mr. Nobody";

    } 
        var actionText = ('\n' + logline + '\n' + action + " : " + value + '\n' + logline);
        console.log(actionText);
        logData(actionText);
        var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=" + keys.omdb.id;
        axios.get(queryUrl).then(
            function (response) {

                var introText = ('Movie stats for ' + value + ":\n");
                console.log(introText);
                logData("\n" + introText);

                var movieData = [
                    "Title: " + response.data.Title,
                    "Year Released: " + response.data.Year,
                    "IMDB Rating: " + response.data.imdbRating,
                    "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value,
                    "Country/Countries Produced: " + response.data.Country,
                    "Language(s): " + response.data.Language,
                    "Plot: " + response.data.Plot,
                    "Actors: " + response.data.Actors
                ].join("\n");

                console.log(movieData + "\n");
                logData("\n" + movieData + "\n");
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an object that comes back with details pertaining to the error that occurred.
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    // console.log("Error", error.message);
                    var errText = "\nSorry, that movie couldn't be found. Please search again...\n"
                    console.log(errText);
                    logData(errText)
                }
                // console.log(error.config);
            });

    }