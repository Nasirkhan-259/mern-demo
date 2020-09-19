const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Todo = new Schema({
    title : {
        type : String
    },
    subTitle : {
        type: String
    },
    level : {
        type : String
    },
    price : {
        type : Number
    },
    attachment : {
        type : String
    }

});
module.exports = mongoose.model('Todo',Todo)