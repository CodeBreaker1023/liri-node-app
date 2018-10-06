// Export Spotify
console.log("This is loaded");
exports.spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
}

// Export Bandsintown
exports.BIT = {
    BITappID: process.env.BIT_APP_ID
}

// Export OMDb
exports.OMDB = {
    omdbKey: process.env.OMDB_KEY
}