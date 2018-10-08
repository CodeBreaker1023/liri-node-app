# liri-node-app

LIRI Bot is a Language Interpretation and Recognition Interface. It's a command line node app that takes in parameters and gives back the requested data. LIRI will search for Spotify songs, Bands in Town for concerts, and OMDB for movies. Watch and be amazed!



///////////////////////////////////////////////////////////////////////////////////
VERIFICATION OF FUNCTIONING APP

<<<< movie-this >>>>
--------------------
$ node liri.js movie-this
This is loaded
? Please type the movie you would like LIRI to look up: Gladiator
 LIRI will look up Gladiator
Title: Gladiator
Year: 2000
IMDB Rating: 8.5/10
Rotton Tomatoes Rating 77%
Country USA, UK
Language English
Plot A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.
Actors Russell Crowe, Joaquin Phoenix, Connie Nielsen, Oliver Reed
///////////////////////////////////////////////////////////////////////////////////////


\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
<<<< spotify-this >>>> (single word song)
----------------------------------------
$ node liri.js spotify-this Amerimacka
This is loaded
Artist: Thievery Corporation
Song: Amerimacka featuring Notch
Album: The Cosmic Game


Artist: Thievery Corporation
Song: Amerimacka
Album: It Takes A Thief


Artist: Deejay Heroes
Song: Amerimacka
Album: Ibiza Am Pm


Artist: Deejay Heroes
Song: Amerimacka
Album: Ibiza Am Pm (the Essential Guide To Summer Dance Music)


<<<< spotify-this >> (multi-word song) >>>>
-------------------------------------------
$ node liri.js spotify-this "Love Me Do"
This is loaded
Artist: Ellie Goulding
Song: Love Me Like You Do - From "Fifty Shades Of Grey"
Album: Delirium (Deluxe)


Artist: Demi Lovato
Song: You Don't Do It For Me Anymore
Album: Tell Me You Love Me


Artist: 2Pac
Song: Do For Love
Album: R U Still Down? [Remember Me]


Artist: The Beatles
Song: Love Me Do - Remastered 2009
Album: Please Please Me (Remastered)


Artist: Ellie Goulding
Song: Love Me Like You Do - From "Fifty Shades Of Grey"
Album: Fifty Shades Of Grey (Original Motion Picture Soundtrack)
//////////////////////////////////////////////////////////////////////////////////////


\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
<<<< CONCERT THIS >>>>
----------------------
$ node liri.js concert-this Metallica
This is loaded
Venue: Zilker Metropolitan Park
City: Austin, TX
Event Date: 2018-10-06T11:00:00
------------
Venue: Zilker Metropolitan Park
City: Austin, TX
Event Date: 2018-10-13T11:00:00
------------
Venue: Fiserv Forum
City: Milwaukee, WI
Event Date: 2018-10-16T19:30:00
------------
///////////////////////////////////////////////////////////////////////////////////////