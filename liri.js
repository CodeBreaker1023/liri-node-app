// L I R I - N O D E - A P P //
// User the node commands below to get LIRI to look things up for you
// Your input should look something like this if you want to access OMDb: $ node liri.js movie-this
// 1. Search Spotify = spotify-this + (song title)
// 2. Search Bandsintown = concert-this
// 3. Search OMDb = movie-this
// 4. do-what-it-says


// List of required NPM modules

require('dotenv').config()

///////// SPOTIFY CONFIG /////////////
// Require node module for Spotify API
var Spotify = require('node-spotify-api');
var SpotifyKeys = require('./keys.js');
// var spotify = new Spotify(keys.spotify);

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
var trackName = process.argv[3];
if (!trackName) {
  trackName = "Three Little Birds"
};
songRequest = trackName;
spotify.search(
  { 
    type: 'track', 
    query: songRequest
  }, 
    function(err, data) {
      if (!err) {
        var trackInfo = data.tracks.items;
        for (var i=0; i < 5; i++) {
          if (trackInfo[i] != undefined) {
            var spotifyResults = 
            "Artist: " + trackInfo[i].artists[0].name + "\n" +
            "Song: " + trackInfo[i].name + "\n" +
            "Album: " + trackInfo[i].album.name + "\n"
          
          console.log(spotifyResults);
          console.log(' ');
          };
        };
      } else {
        console.log("error: " + err);
        return;
      };
    });
  }
      
// <<<<<<<<<<< CONCERT THIS FUNCTION >>>>>>>>>>>>

function concertThis(){
  inquirer.prompt ([
    {
      type: "input",
      message: "Please type the Artist or Band for LIRI to look up their tour dates and venues:",
      name: "concert"
    }
  ]).then(function (inquirerResponse) {
    // Calls Bandsintown API to look for concert dates
    axios.get("https://rest.bandsintown.com/artists/" + inquirerResponse + "/events?app_id=codingbootcamp")
    .then(function (response) {
      // // Create a for loop that iterates the response.data
      for (var i = 0; i < 3; i++) {
      //Logs the command used, venue name, location and date of the show for the artist name
      console.log("Venue: " + response.data[i].venue.name);
      console.log("City: " + response.data[i].venue.city + ', ' + response.data[i].venue.region);
      console.log("Event Date: " + response.data[i].datetime);
      console.log("------------");
      }
    })
    .catch(function(error) {
      // Console.log any errors 
      console.log(error);
    })
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
