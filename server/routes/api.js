const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/epiprot', (err, client) => {
        if (err) return console.log(err);
    
        let db = client.db('epiprot');
        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get proteins
router.get('/proteins', (req, res) => {
    connection((db) => {
        db.collection('proteins')
            .find()
            .toArray()
            .then((proteins) => {
                response.data = proteins;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

const https = require("https");
const url =
  "https://www.ebi.ac.uk/proteins/api/proteins/Q99523";
https.get(url, res => {
  res.setEncoding("utf8");
  let body = "";
  res.on("data", data => {
    body += data;
  });
  res.on("end", () => {
    body = JSON.parse(body);
    console.log(body);
  });
});

module.exports = router;