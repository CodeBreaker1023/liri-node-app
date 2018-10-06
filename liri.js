// L I R I - N O D E - A P P //
// Commands for LIRI:
// 1. spotify-this-song
// 2. concert-this
// 3. movie-this
// 4. do-what-it-says
// List of required NPM modules

require('dotenv').config()

///////// SPOTIFY CONFIG /////////////
// Require node module for Spotify API
var Spotify = require('node-spotify-api');
// var spotify = new Spotify(keys.spotify);

///////// AXIOS - BAND-IN-TOWN && OMDB ///////////////
// Get axios npm package **Install "npm install axios" first thing
// Require node module for bands-in-town and omdb
var axios = require("axios");

// Require node module fs 
var fs = require('fs');


// grab user input
var runOperation = process.argv[2];
 
userCommand(runOperation);
function userCommand(runOperation){
// Create Switch Statement for user commands
switch (runOperation) {
  //concert this
  case "concert-this":
  //Grabs the artistName arguement
  var artistName = argument;
  //If artistName is not provided defaults to Avatar
  if (artistName === "") {
    lookupAvatar();
  } else {
    //Gets the event info for artist name
    getEventInfo(artistName);
  }
  break;
  //Gathers song information from spotify API
  case "spotify-this-song":
  //Grabs the songTitle argument
  var songTitle = argument;
  //if no songTitle is provided then defaults to "All the small things"
  if (songTitle === "") {
    lookupSpecificSong();
  } else {
    //Gets the song info for the specified song
    getSongInfo(songTitle);
  }
  break;
  //Gets Movie information
  case "movie-this":
  //Grabs the movieTitle argument
  var movieTitle = argument;
  //If no movieTitle is provided then defaults to "Mr. Nobody"
  if (movieTitle === "") {
    lookupSpecificMovie();
  } else {
    //Gets the movie info for the specific movie
    getMovieInfo(movieTitle);
  }
  break;
  //do what it says
  case "do-what-it-says":
  //Performs the action indicated in the random.txt file
  doWhatItSays();
  break;
}
} 


// Create a controller that does the operation asked of it by searching the argument
doOperation(operation, argument)

function doOperation(operation, argument) {
  argument = getArgument();
}




// Store all of the arguments in an array
var nodeArgs = process.argv;

// Create an empty variable for holding the movie name
var movieName = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 2; i < process.argv.length; i++) {
  if (i > 2 && i < process.argv.length) {
    movieName = movieName + " " + process.argv[i];
  }
  else {
    movieName += process.argv[i];
  }
}

// Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// This line is just to help us debug against the actual URL.
console.log("QueryURL: " + queryUrl);

axios.get(queryUrl).then(
  function(response) {
    console.log("Title: " + response.data.Title);
    console.log("Release Year: " + response.data.Year);
    console.log("Release Year: " + response.data.Rated);
    console.log("Release Year: " + response.data.Runtime);
  }
);