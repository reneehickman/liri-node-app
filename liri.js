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
        spotifyThis(value);
        break;

    case 'movie-this':
        omdb(value);
        break;

    case 'do-what-it-says':
        doIt(value);
        break;
    default:
    var defaultText = ("\nPlease enter one of the following: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says");
        console.log(defaultText);
        logData(defaultText);
}


function logData(data) {
    fs.appendFile("log.txt", data, function (error) {
        if (error) throw error;
    });
}


//Funtion for concert-this Bands in Town API
function concert(value) {
    var actionText = (logline + '\n' + action + " : " + value + '\n' + logline);

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
                    var nullText = ("\nSorry, it doesn't look like that artist/band is on the road...\n");
                    console.log(nullText);
                    logData("\n" + nullText);
                }
            })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                var reqText = "\nPlease enter an artist/band and try your search again...\n"
                console.log(reqText);
                logData("\n" + reqText)
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                // console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                var errText = "Sorry, that artist/band couldn't be found. Please try your search again...\n"
                console.log(errText);
                logData("\n" + errText)
                // console.log("Error", error.message);
                // logData(errText + error.message);
            }
            // console.log(error.config);
        });
}


function spotifyThis(value) {
    

    var actionText = ('\n' + logline + '\n' + action + " : " + value + '\n' + logline);

    console.log("\n" + actionText);
    logData("\n" + actionText);


    if (!value) {
        value = "The Sign";
  
    spotify
        .search({
            type: 'track',
            query: 'The Sign Ace of Base'
        })
        .then(function (response) {
        
                var trackID = response.tracks.items[0].id;

            // console.log(trackData);
            spotify
                .request('https://api.spotify.com/v1/tracks/' + trackID)
                .then(function (data) {
                    // console.log(data)
                    var songData = [
                        "Artist(s): " + data.artists[0].name,
                        "Song Name: " + data.name,
                        "Preview Link: " + data.preview_url,
                        "Album Name: " + data.album.name
                    ].join("\n");

                    console.log(songData + "\n");
                    logData("\n" + songData + "\n");
                })
                .catch(function (err) {
                    console.error('Error occurred: ' + err);
                });
        })
        .catch(function (err) {
            console.error('Error occurred: ' + err);
        });

    } else{



    spotify
        .search({
            type: 'track',
            query: value
        })
        .then(function (response) {
            var songData = [
                "Artist(s): " + response.tracks.items[0].artists[0].name,
                "Song Name: " + response.tracks.items[0].name,
                "Preview Link: " + response.tracks.items[0].preview_url,
                "Album Name: " + response.tracks.items[0].album.name
            ].join("\n");

            console.log(songData + "\n");
            logData("\n" + songData + "\n");

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
            var errText = "\nSorry, that song couldn't be found. Please try again...\n"
            console.log(errText);
            logData(errText)
            console.log("Error", error.message);
            // logData(errText + error.message);
        }
        // console.log(error.config);
    });

}
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
                var data = response.data;
                var introText = ('Movie stats for ' + value + ":\n");
                console.log(introText);
                logData("\n" + introText);

                var movieData = [
                    "Title: " + data.Title,
                    "Year Released: " + data.Year,
                    "IMDB Rating: " + data.imdbRating,
                    "Rotten Tomatoes Rating: " + data.Ratings[1].Value,
                    "Country/Countries Produced: " + data.Country,
                    "Language(s): " + data.Language,
                    "Plot: " + data.Plot,
                    "Actors: " + data.Actors
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
                var errText = "\nSorry, that movie couldn't be found. Please search again...\n"
                console.log(errText);
                // console.log("Error", error.message);
                logData("\n" + errText)
            }
            // console.log(error.config);
        });

}


function doIt() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) throw error;

        var splitValue = data.split(",").slice(1).join('');
        var command = data.split(",").slice(0, 1).toString();

        var valueToRun = splitValue.split('"').join('');
        // console.log(command + valueToRun)

        switch (command) {
            case "spotify-this-song":
                spotifyThis(valueToRun);
                break;
            case "concert-this":
                concert(valueToRun);
                break;
            case "movie-this":
                omdb(valueToRun);
                break;
            default:
                console.log("error reading file");
        }

    })
}