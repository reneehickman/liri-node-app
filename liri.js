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

var logline = "----------------------------------"


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
        if (error) {
            console.log(error);
        }
    });
}



//Funtion for concert-this Bands in Town API
function concert(value) {
    var actionText = ('\n' + logline + '\n' + action + " : " + value + '\n' + logline);

    console.log(actionText);
    logData(actionText);

    var queryUrl = "https://rest.bandsintown.com/artists/" + value + "/events?app_id=" + keys.bandsintown.id + '"';

    axios.get(queryUrl).then(
        function (response) {
            if (value == null) {
                var nullText = ("\nSorry. It looks like that artist isn't on the road. Please search again...");
                console.log(nullText);
                logData(nullText);
            } else {

                var introText = ('\nUpcoming concerts for ' + value + "\n" + logline);
                console.log(introText);
                logData(introText);

                for (var i = 0; i < response.data.length; i++) {
                    var outputData = ('\nVenue Name: ' + response.data[i].venue.name + '\nVenue Location: ' + response.data[i].venue.city + ', ' + response.data[i].venue.country + '\nDate of the Event: ' + moment(response.data[i].datetime).format("MM/DD/YYYY") + "\n");
                    console.log(outputData);
                    logData(outputData);
                }
            }
        })
        .catch(function (error) {
            console.log(error);
            var errorText = ("\nSorry that artist couldn't be found. Please search again...");
            console.log(errorText);
            logData(errorText);
        });

}


