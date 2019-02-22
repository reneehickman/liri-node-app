# liri-node-app

## LIRI - Not to be confused with SIRI
LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line Node.js app that takes in parameters and passes back data based on those parameters. LIRI searches Spotify for songs, Bandsintown for concerts, and OMDB for movies.

`.gitignore` is used to hide API keys which are stored locally and kept safe through abstraction by `.env`, requiring users to provide their own API keys if they intend to use the app. All data input by the user to the terminal is logged into `log.txt` using `fs.appendFile` in the `logData()` function.


### LIRI Commands

1. `node liri.js concert-this <artist/band-name>`
2. `node liri.js spotify-this-song <song-name>`
3. `node liri.js movie-this <movie-name>`
4. `node liri.js do-what-it-says`
    

### Technology/Dependencies 

* Node.js: https://nodejs.org/en/
* Node-File-System: https://nodejs.org/api/fs.html
* Axios: https://www.npmjs.com/package/axios
* DotEnv: https://www.npmjs.com/package/dotenv
* JavaScript: https://www.javascript.com/
* Moment.js: https://www.npmjs.com/package/moment
* OMDB-API: http://www.omdbapi.com
* Bandsintown-API: http://www.artists.bandsintown.com/bandsintown-api
* Node-Spotify-API: https://www.npmjs.com/package/node-spotify-api


### What each command does:

1. `node liri.js concert-this <artist/band-name>`
    * This command searches the Bands in Town Artist Events API through Axios based on the users input and returns events the artist is appearing at in the near future. It includes `Venue Name: `, `Venue Location: `, and `Date of the Event: `. If no artist is entered, the user receives an error message saying "Please enter an artist/band and try your search again..." If an artist is entered but there is no concert data to display, the user receives a message saying "Sorry, it doesn't look like that artist/band is on the road...". Lastly, if the user enters an artist that doesn't exist the user receives a message saying "Sorry, that artist/band couldn't be found. Please try your search again"

2. `node liri.js spotify-this-song <song-name>`
    * This command utilizes the node-spotify-api package in order to retrieve song information from the Spotify API based on user input. It includes `Artist(s): `, `Song Name: `, and `Preview Link: `, and `Album Name: `. If no artist is entered, the API automatically searches "The Sign" by Ace of Base for the user.

3. `node liri.js movie-this <movie-name>`
    * This command searches the OMDB API through Axios and returns information about the movie the user entered. It includes `Title: `, `Year Released: `, `IMDB Rating: `, `Rotten Tomatoes Rating: `, `Country/Countries Produced: `, `Language(s): `, `Plot: `, and `Actors: `. If no movie is entered, the API automatically searches and returns information about the movie Mr. Nobody.

4. `node liri.js do-what-it-says`
    * Using the `fs` Node package, LIRI accesses the text in random.txt and uses that to call one of LIRI's commands for the user. It currently runs `spotify-this-song` for "I Want it That Way" by the Backstreet Boys, but can also be modified to search for a specific movie for movie-this, or a specific artist for concert-this.

5. `node liri.js`
    * If no action/command input is received, the terminal returns the message `Invalid action. Please enter one of the following: concert-this | spotify-this-song | movie-this | do-what-it-says`.
