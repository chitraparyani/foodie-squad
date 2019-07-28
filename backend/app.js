const express = require('express');
const http = require('follow-redirects').http;
const path = require("path");

// creating an express app

const app = express();

// import our model

const User = require('./models/user');

const mongoose = require('mongoose');

//mongoose.connect("mongodb://localhost/test", {useNewUrlParser:true})
// mongodb+srv://root:<password>@cluster0-k86iy.mongodb.net/test?retryWrites=true
mongoose.connect('mongodb+srv://root:root@cluster0-k86iy.mongodb.net/FoodieSquad?retryWrites=true')
.then(()=>{
  console.log('Connected to MongoDB database')
})
.catch(()=>{
  console.log('Connection failed!')
});

// importing body-parser

const bodyParser = require('body-parser');


app.use(bodyParser.json());

//for url encoded data you can use following function
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use("/images", express.static(path.join("backend/images")));


// creating middleware using express

// enabling cors

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
  next();
});

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/*
 * Also instead of above command you can use following code after running:  npm install --save cors
 *
 * const cors = require('cors');
 * app.use(cors());
 */

//Initialize routes
let userRoutes = require('./routes/user-route');
const reviewRoutes = require('./routes/review-route');
userRoutes(app);
//let postRoutes = require('./routes/post-route');
let restaurantRoutes = require('./routes/restaurant-route');
let emailRoutes = require("./routes/email-route");
let imageRoutes = require("./routes/image-route");

userRoutes(app);
//postRoutes(app);
restaurantRoutes(app);
emailRoutes(app);

// export the app to used in node.js server

app.use("/api/reviews", reviewRoutes);
app.use("/api/images", imageRoutes);


module.exports = app;
