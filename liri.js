// L I R I - N O D E - A P P //
// User the node commands below to get LIRI to look things up for you
// Your input should look something like this if you want to access OMDb: $ node liri.js movie-this
// 1. Search Spotify = spotify-this + (song title)
// 2. Search Bandsintown = concert-this + (artist/band)
// 3. Search OMDb = movie-this
// 4. do-what-it-says


// List of required NPM modules

require('dotenv').config()

///////// SPOTIFY CONFIG /////////////
// Require node module for Spotify API
var Spotify = require('node-spotify-api');
var SpotifyKeys = require('./keys.js');

///////// AXIOS - BAND-IN-TOWN && OMDB ///////////////
// Get axios npm package 
// Require node module for bands-in-town and omdb
var axios = require("axios");

// Require node module fs 
var fs = require('fs');

// Require inquirer for responsive prompts to node commands
var inquirer = require('inquirer');


// grab user input
var runOperation = process.argv[2];

// Create Switch Statement for user commands
userCommand(runOperation);
function userCommand(runOperation){
switch (runOperation) {
  
  // Reference Spotify API to locate song information
  case "spotify-this":
    spotifyThis();
  break;
  
  // Reference Bandsintown API to locate concert info
  case "concert-this":
    concertThis();
  break;
 
  // Reference OMDb API for movie info
  case "movie-this":
    movieThis();
  break;
  
  // Reference log.txt to perform an action
  case "do-what-it-says":
    // Create function that performs action listed in log.txt
    doWhatItSays();
  break;

  default: console.log("\n" + "type any command after node liri.js:" + "\n" + "spotify-this + (song title)" + "\n" + "concert-this" + "\n" + "movie-this" + "\n" + "do-what-it-says" + "\n" + "Use quotes for mutli-word titles");
  }
} 

// <<<<<<<<<<< SPOTIFY THIS FUNCTION >>>>>>>>>>>>

function spotifyThis(trackName) {
// Call the spotify API by setting variable = key
var spotify = new Spotify(SpotifyKeys.spotify);
// Assign song input to track name
var trackName = process.argv[3];
// If no song selected, assign trackname to BSB - I Want It That Way as indicated
if (!trackName) {
  trackName = "I Want It That Way"
};
// Assign request to trackname
songRequest = trackName;
// Search Spotify with type and query
spotify.search(
  { 
    type: 'track', 
    query: songRequest
  }, 
    function(err, data) {
      // If no err, for loop through trackInfo + arist name/name/album name
      if (!err) {
        var trackInfo = data.tracks.items;
        for (var i=0; i < 5; i++) {
          if (trackInfo[i] != undefined) {
            var spotifyResults = 
            "Artist: " + trackInfo[i].artists[0].name + "\n" +
            "Song: " + trackInfo[i].name + "\n" +
            "Album: " + trackInfo[i].album.name + "\n"
          
          // Console log results
          console.log(spotifyResults);
          console.log(' ');
          };
        };
      } else {
        // Console.log if any errors
        console.log("error: " + err);
        return;
      };
    });
  }
      
// <<<<<<<<<<< CONCERT THIS FUNCTION >>>>>>>>>>>>

function concertThis(){
    // Calls Bandsintown API to look for concert dates
    var queryURL = "https://rest.bandsintown.com/artists/" + process.argv[3] + "/events?app_id=ea94f426-4fab-4bb1-b6ba-bd86821d522f"
    axios.get(queryURL)
    .then(function (response) {
      if(response != "undefined")
        // Create a for loop that iterates the response.data
        for (var i = 0; i < response.data.length; i++) {
        // Console log the venue name, location and date of concert
        console.log("Venue: " + response.data[i].venue.name);
        console.log("City: " + response.data[i].venue.city + ', ' + response.data[i].venue.region);
        console.log("Event Date: " + response.data[i].datetime);
        console.log("------------");
        } else {
          console.log("0 results. Please try again.");
        }
    })
    .catch(function(error) {
      // Console.log any errors 
      console.log("0 results. Please try again.");
    })
  }


// <<<<<<<<<<< MOVIE THIS FUNCTION >>>>>>>>>>>>>
function movieThis() {
  inquirer.prompt ([
    {
      type: "input",
      message: "Please type the movie you would like LIRI to look up:",
      name: "movie"
    }
  ])
  .then(function(inquirerResponse) {
      // Console long to check function is running
      console.log(" LIRI will look up " + inquirerResponse.movie);

      // Use axisos to get movie info
      axios.get('http://www.omdbapi.com/?apikey=trilogy&t=' + inquirerResponse.movie)
      .then(function (response) {
      // Movie Title
      console.log('Title: ' + response.data.Title);
      // Release Date
      console.log('Year: ' + response.data.Year);
      // IMDB Rating
      console.log('IMDB Rating: ' + response.data.Ratings[0].Value);
      // Rotten Tomatoes Rating 
      console.log('Rotton Tomatoes Rating ' + response.data.Ratings[1].Value);
      // Country
      console.log('Country ' + response.data.Country);
      // Language
      console.log('Language ' + response.data.Language);
      // Plot
      console.log('Plot ' + response.data.Plot);
      // Cast
      console.log('Actors ' + response.data.Actors);
      console.log("------------");
    })
      .catch(function (error) {
        // Console.log any errors 
        console.log(error);
      })
  })
}
