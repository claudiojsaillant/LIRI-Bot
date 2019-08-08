require("dotenv").config({ path: '.env' });
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require("moment")
var spotify = new Spotify(keys.spotify);
var fs = require('fs');

if (process.argv[2] != 'do-what-it-says' && process.argv[3] != undefined) {
    botAction(process.argv[2], process.argv[3])
} else if (process.argv[3] != undefined) {
    filename = process.argv[3];
    doThis(filename)
}
else {
    console.log("Make sure that you fill the next parameter with the name of the text file && make sure the file is inside the directory of the bot")
}

function spotifyMe(argument) {
    spotify
        .request("https://api.spotify.com/v1/search?q=" + argument + "&type=track")
        .then(function (data) {
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Song: " + data.tracks.items[0].name);
            console.log("Preview link: " + data.tracks.items[0].preview_url);
            console.log("Album: " + data.tracks.items[0].album.name)
        })
        .catch(function (err) {
            console.error('Error occurred: ' + err);
        });
}

function concertMe(argument) {
    axios({
        method: 'get',
        url: "https://rest.bandsintown.com/artists/" + argument + "/events?app_id=codingbootcamp"
    })
        .then(function (response) {
            eventData = response.data
            if (response.data.length != 0) {
                for (i = 0; i < response.data.length; i++) {
                    console.log(eventData[i].venue.name);
                    console.log(eventData[i].venue.city + ", " + eventData[i].venue.country);

                    console.log("Date: " + moment(eventData[i].datetime).format('l'))
                    console.log("=================================");
                }
            }
            else {
                console.log("No events upcoming for this artist")
            }
        });
}

function movieMe(argument) {
    var url;
    if (argument === undefined) {
        url = 'http://www.omdbapi.com/?apikey=trilogy&t=Mr+Nobody'
    } else {
        url = 'http://www.omdbapi.com/?apikey=trilogy&t=' + argument
    }
    axios({
        method: 'get',
        url: url
    })
        .then(function (response) {
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Produced Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        });
}

function doThis(filename) {
    fs.readFile(filename, 'utf8', function (err, data) {
        if (err) throw err;
        textData = data.split(',')
        textData1 = textData[1]
        if (textData[0] === 'concert-this') {
            textData1 = textData1.split('"');
            textData1 = textData1[1];
        }
        botAction(textData[0], textData1)
    })
}

function botAction(action, argument) {
    switch (action) {
        case 'spotify-this-song':
            spotifyMe(argument);
            break;
        case 'concert-this':
            concertMe(argument);
            break;
        case 'movie-this':
            movieMe(argument);
            break;
        default: console.log("Invalid command");
    }
}