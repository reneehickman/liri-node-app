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

var logline = "----------------------------------";


// Take two arguments.
// The first will be the action (i.e. "concert", "spotify", etc.)
// The second will be the value/name of band/song/movie
var action = process.argv[2];
var value = process.argv.slice(3).join(" ");
var artistName = process.argv.slice(3).join(" ");


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


function logline() {
    console.log("----------------------------------");
}


function logData(data) {
    fs.appendFile("log.txt", data, function (error) {
        if (error) {
            console.log(error);
        }
    });
}



//Funtion for concert-this Bands in Town API
function concert(artist) {
    var actionText = ('\n' + logline + '\n' + action + " : " + value + '\n' + logline);

    console.log(actionText);
    logData(actionText);

    var queryUrl = "https://rest.bandsintown.com/artists/" + value + "/events?app_id=" + keys.bandsintown.id;

    axios.get(queryUrl).then(
            function (response) {
                if (artist = undefined) {
                    var nullText = ("\nSorry it looks like that artist isn't on the road. Please search again...");
                    console.log(nullText);
                    logData(nullText);
                }

                // var introText = ("\n" + logline + '\nUpcoming concerts for ' + value + "\n" + logline);
                // console.log(introText);
                // logData(introText);

                for (var i = 0; i < 3 && i < response.data.length; i++) {
                    var outputData = ('\nVenue Name: ' + response.data[i].venue.name + '\nVenue Location: ' + response.data[i].venue.city + ', ' + response.data[i].venue.country + '\nDate of the Event: ' + moment(response.data[i].datetime).format("MM/DD/YYYY") + "\n");
                    console.log(outputData);
                    logData(outputData);
                }
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
                    console.log("Error", error.message);
                }
                console.log(error.config);
            });

}

// var errorText = ("\nSorry no concerts for that artist could be found. Please search again...");
//             console.log(errorText);
//             logData(errorText);

function omdb() {
    var movieName = process.argv.slice(3).join(" ");
    var queryUrl = "http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=" + keys.omdb.id;


    if (!movieName) {
        var actionText = ('\n' + logline + '\n' + action + " : " + value + '\n' + logline);
    console.log(actionText);
    logData(actionText);
        axios.get(queryUrl).then(
            function (response) {
                console.log(logline)
                console.log("Title: " + response.data.Title);
                console.log("Year Released: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                console.log("Country/Countries Produced: " + response.data.Country);
                console.log("Language(s): " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
                console.log(logline);
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
                    console.log("Error", error.message);
                }
                console.log(error.config);
            });
            
    } else {
        var actionText = ('\n' + logline + '\n' + action + " : " + value + '\n' + logline);
    console.log(actionText);
    logData(actionText);
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=" + keys.omdb.id;
        axios.get(queryUrl).then(
            function (response) {
                console.log(logline)
                console.log("Title: " + response.data.Title);
                console.log("Year Released: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                console.log("Country/Countries Produced: " + response.data.Country);
                console.log("Language(s): " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
                console.log(logline)
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
                    console.log("Error", error.message);
                }
                console.log(error.config);
            });
            
    }
}