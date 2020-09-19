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
mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})
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