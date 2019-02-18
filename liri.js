require("dotenv").config();

//Axios package
// var axios = require("axios");

//code to import keys js stored into a variable
var keys = require("./keys.js");

//load the spotify keys
var spotify = new Spotify(keys.spotify);