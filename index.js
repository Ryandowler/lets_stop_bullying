const express = require('express');
const path = require('path');
const generatePassword = require('password-generator');
const MongoClient = require('mongodb').MongoClient;
let db;

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));



// MongoClient.connect('mongodb://127.0.0.1:27017', (err, database) => {
MongoClient.connect('mongodb://test:letsstop1@ds259410.mlab.com:59410/lets-stop-bullying', (err, database) => {

    //if there is an error log it
    if (err) { console.log(err); }
    //if there are no errors
    else {
        //set db object to 'lets-stop-bullying' database
        db = database.db('lets-stop-bullying');

        db.collection("content").find({}).toArray(function(err, result) {
        if (err) throw err;
            console.log(result);
        });
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

// Put all API endpoints under '/api'
app.get('/api/passwords', (req, res) => {
  const count = 5;

  // Generate some passwords
  const passwords = Array.from(Array(count).keys()).map(i =>
    generatePassword(12, false)
  )

  // Return them as json
  res.json(passwords);

  console.log(`Sent ${count} passwords`);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);
