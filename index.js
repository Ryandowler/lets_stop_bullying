const express = require('express');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
let db;

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use('/images', express.static(__dirname + '/images'));

//connects to mongo
MongoClient.connect('mongodb://test:letsstop1@ds259410.mlab.com:59410/lets-stop-bullying', (err, database) => {

    //if there is an error log it
    if (err) { console.log(err); }
    //if there are no errors
    else {
        //set db object to 'lets-stop-bullying' database
        db = database.db('lets-stop-bullying');

    }

    //listen for requests to db on port 8000
    app.listen(8000, () => {
        console.log('Database connected');
    });
});

app.get("/api/content", (req, res) => {
    db.collection("content").find({}).toArray(function(err, result) {
    if (err) throw err;
        res.status(200).json(result);
    });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Server listening on ${port}`);
