### LIRI-Bot

-Don't you always wanted to search for music, concerts and movies at the same time? That's not going to be a problem anymore thanks to LIRI, a command line app.

## App Composition

This app is organized in 4 files:

1. keys.js: It takes the spotify authentication keys from a .env file.

# Must be set up by the user before using the app
2. .env: this is where you are going to put your spotify keys in this format 

SPOTIFY_ID=''
SPOTIFY_SECRET=''

3. package.json: Contains the name and version of all the npm packages that will be required to make the app work.

4. liri.js: The app that is going to run in command line interface with node, this file makes the api calls and display the data in an organized way.

## Technologies used

#JavaScript
#Node.js
 Node Packages:
    *npm
    *moment.js
    *axios
    *spotify api
    *file system

## Deployed link: 

## Instructions

1) Install node.js and the packages that need to be installed (found in package.json).

2) There are 4 commands that can use used:
    
    spotify-this: Search for an specific song and displays the artist, song name, preview link and the album from the song. example call: node liri.js spotify-this "old town road".

    concert-this: Search for concerts of an specific artist and displays detailed information from concerts (the place, the city and the date) if the artitst is on tour. example call: node liri.js  concert-this "metallica".

    movie-this: Search for an specific movie and displays information about it (title, year, ratings, plot, etc..). example call: node liri.js movie-this "The Avengers"

    do-what-it-says: Takes a .txt file in the same directory as liri.js, reads it and searches a command call the user writes in it (the command call should be one of the 3 commands stated). example call: node liri.js do-what-it-says name.txt
    the command call should be inside the .txt file, theres an example .txt file in the app directory 
     './random.txt'


3) Open command line interface and type: 
    node liri.js "command-here" "argument-here"

4) Enjoy the app.



