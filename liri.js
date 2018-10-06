// L I R I - N O D E - A P P //
// User the node commands below to get LIRI to look things up for you
// Your input should look something like this if you want to access OMDb: $ node liri.js movie-this
// 1. Search Spotify = spotify-this
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
  }
} 


//Calls spotify API to retrieve the song information for songTitle
function spotifyThis(songTitle) {
//sets spotify equal to the key info to call the spotify API
var spotify = new Spotify(SpotifyKeys.spotify);

inquirer.prompt ([
  {
    type: "input",
    message: "Please type the song you would like LIRI to look up:",
    name: "song"
  }

// spotify.search(
//       { 
//         type: 'track', 
//         query: songTitle
//       })
      
    .then(function(response) {

    // //Default search on the spotify API returns 20 objects
    // //Going to attempt to find documentation regarding limit on npm later to render this solution unneeded
    // var artistsArray = response.tracks.items[0].album.artists;
    
    // //Array to hold artists names, for songs that return multiple artists
    // var artistNames = [];
    
    // //Goes down the length of the array and pushes the artists names for each song
    // for (var i = 0; i < artistsArray.length; i++) {
    //   artistNames.push(artistsArray[i].name);
    // }

    // //Converts the array into a string
    // var artists = artistNames.join(", ");
    
    //Console.logs the response from the Spotify API for Artist, Song title, URL, and Album name
    console.log("Command: spotify-this-song " + response.tracks.items[0].name);
    console.log("Artist: " + artists);
    console.log("Song: " + response.tracks.items[0].name);
    console.log("Spotify preview URL: " + response.tracks.items[0].preview_url);
    console.log("Album name: " + response.tracks.items[0].album.name);
    console.log("------------");
  })
    .catch(function(err) {
    //console.logs any caught errors
    console.log(err);
    console.log(err);
  })
}

//searches the spotify API by track name 
spotify.request( 'https://api.spotify.com/v1/tracks/3DYVWvPh3kGwPasp7yjahc' )
  .then(function(response) {
    //Console.logs the response from the Spotify API for Artist, Song title, URL, and Album name
    console.log("Command: spotify-this-song " + response.name);
    console.log("Artist: " + response.artists[0].name);
    console.log("Song: " + response.name);
    console.log("Spotify preview URL: " + response.preview_url);
    console.log("Album name: " + response.album.name);
    console.log("------------");
  })
  .catch(function(err) {
    //console.logs any caught errors
    console.log(err);
    console.log(err);
  });
}

//concert-this
//-------------------
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

// // Create a controller that does the operation asked of it by searching the argument
// doOperation(operation, argument)

// function doOperation(operation, argument) {
//   argument = getArgument();
// }




// // Store all of the arguments in an array
// var nodeArgs = process.argv;

// // Create an empty variable for holding the movie name
// var movieName = "";

// // Loop through all the words in the node argument
// // And do a little for-loop magic to handle the inclusion of "+"s
// for (var i = 2; i < process.argv.length; i++) {
//   if (i > 2 && i < process.argv.length) {
//     movieName = movieName + " " + process.argv[i];
//   }
//   else {
//     movieName += process.argv[i];
//   }
// }

// // Then run a request to the OMDB API with the movie specified
// var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// // This line is just to help us debug against the actual URL.
// console.log("QueryURL: " + queryUrl);

// axios.get(queryUrl).then(
//   function(response) {
//     console.log("Title: " + response.data.Title);
//     console.log("Release Year: " + response.data.Year);
//     console.log("Release Year: " + response.data.Rated);
//     console.log("Release Year: " + response.data.Runtime);
//   }
// )