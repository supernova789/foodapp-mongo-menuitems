var express = require('express');
var app = express();
// 'use strict';

const fs = require('fs');

//Mongo DB
const mongoose = require("mongoose");
const db = mongoose.connection;

const {
  MONGO_URL,
  MONGO_DATABASE,
  MONGO_USERNAME,
  MONGO_PASSWORD
}  = process.env;


//Mongoose local DB connection
// mongoose.connect('mongodb://localhost:27017/foodappmoreinfo', { useNewUrlParser: true }).then(
//     () => {
//         console.log('Database is connected'); 
//     },
//     err => { console.log('Can not connect to the database'+ err)}
//   );



//Mongoose main for DB connection (pod)
mongoose.connect('mongodb://'+MONGO_URL+'/'+MONGO_DATABASE+'?authSource=admin', 
{ 
  useNewUrlParser: true,
  auth: {
    user: MONGO_USERNAME,
    password: MONGO_PASSWORD
   } 
}
).then(() => {
    console.log("DB connected");
}).catch((err)=> {
    console.log('Can not connect to the database'+err)
})


  db.once("open", function() {

    db.collection('menuitems').count(function (err, count) {
      if (err) throw err;    
      console.log('Total menuitems Rows: ' + count);
    });


  }); 


//API Call to fetch User List
var API_USER_URL = '/api/menuitems';

//Code Snippet to allow CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Restful Service to fetch user list
app.get(API_USER_URL, function (req, res) {

  // fs.readFile( __dirname + "/server/data/" + "menuitems.json", 'utf8', function (err, data) {
  //   //  console.log('Send data is '+data );
  //    res.send( data );
  // });

  db.collection('menuitems').find().toArray()
      .then(result => {
        console.log(result);
        res.send(result);
      })
      .catch(error => console.error(error))
})


// app.get('/', function (req, res) {
//   res.send(student);
// });


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});