require("dotenv").config();

//Axios package
var axios = require("axios");

//code to import keys js stored into a variable
var keys = require("./keys.js");

//load the spotify keys
var spotify = new Spotify(keys.spotify);

//Required to use moment for node
var moment = require('moment');
moment().format();

// Load the fs package to read and write
var fs = require("fs");

// Take two arguments.
// The first will be the action (i.e. "concert", "spotify", etc.)
// The second will be the value/name of band/song/movie
var action = process.argv[2];
var value = process.argv[3];

// // Loop through all the words in the node argument
//     // And do a little for-loop magic to handle the inclusion of "+"s
//     for (var i = 2; i < value.length; i++) {

//         if (i > 2 && i < value.length) {
//             bandName = bandName + "+" + value[i];
//         }
//         else {
//             bandName += value[i];

//         }
//     }



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


//Funtion for concert-this Bands in Town API
function concert(value) {
    // Create an empty variable for holding the movie name
    var bandName = "";

    // // Loop through all the words in the node argument
    // // And do a little for-loop magic to handle the inclusion of "+"s
    // for (var i = 2; i < value.length; i++) {

    //     if (i > 2 && i < value.length) {
    //         bandName = bandName + "+" + value[i];
    //     }
    //     else {
    //         bandName += value[i];

    //     }
    // }


    var queryUrl = "https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp";

    axios.get(queryUrl).then(
        function (response) {

            for (var i = 0; i < response.data.length; i++) {

                var date = response.data[i].date; //Saves datetime response into a variable
                var dateSplit = date.split('T'); //Attempting to split the date and time in the response

                console.log("\nVenue Name: " + response.data[i].venue.name +
                    "\nVenue Location: " + response.data[i].venue.city +
                    "\nDate of the Event: " + moment(dateSplit[0], "MM-DD-YYYY")); //dateArr[0] should be the date separated from the time

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


