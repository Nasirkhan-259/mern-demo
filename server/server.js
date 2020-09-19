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
app.use(cors());
// Put these statements before you define any routes.
app.use(fileUpload());
app.use(index);

/* todoRoutes.route('/listAll/:id').get(function (req, res) {
    TodoModel.findById({ _id: req.params.id }, function (err, record) {
        if (err)
            console.log(err);
        else
            res.json(record);
    })
}) */

/* todoRoutes.route('/add/record').post(function (req, res) {
    res.json({ requestBody: req.body })
    console.log(req.body);
    let todo = new TodoModel(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json({ 'todo': 'todo added successfully' });
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
}); */
/* todoRoutes.route('/update/:id').post(async function (req, res) {
    TodoModel.findById({ _id: req.params.id },async function (err, record) {
        if (err)
            console.log(err);
        else {
            let aggredvalue = await TodoModel.aggregate([
                {$group : {_id : "$todo_description"}}
            ]);
            console.log(aggredvalue);
            if (record != null) {
                record.todo_description = req.body.todo_description;
                record.todo_responsible = req.body.todo_responsible;
                record.todo_priority = req.body.todo_priority;
                record.todo_completed = req.body.todo_completed;
                record.save().then(todo => {
                    res.json('Todo updated!');
                })
                    .catch(err => {
                        res.status(400).send("Update not possible");
                    });
            }
            else {
                res.json('no record found');
            }
        }
    })
}) */

app.listen(PORT, function () {
    console.log(`Server is running on ${PORT}`)
})