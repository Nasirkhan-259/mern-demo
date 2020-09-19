const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 9090;
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
index = require('./routes/index');
const fileUpload = require('express-fileupload');
require('dotenv').config();
mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ds211265.mlab.com:11265/mern_todo`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
  .then(() => {
    console.log("Connected to the Database");
  })
  .catch((err) => {
    console.log("Could not connected to Database");
  });
app.use(express.static('/public'));
app.use(express.static(__dirname + '/public', { maxAge: '30 days' }));
app.use(express.static(__dirname + '/../public'));
app.use(express.static(__dirname + '/static'));

app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors());
// Put these statements before you define any routes.
app.use(fileUpload());
app.use(index);
app.listen(PORT, function () {
    console.log(`Server is running on ${PORT}`)
})