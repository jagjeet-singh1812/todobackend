const mongoose = require('mongoose');

const Schema=mongoose.Schema;

const list = new Schema({
    text:{ 
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    }
,
timestamp:{
    type:String,
    default:Date.now()
}
});

const todo=mongoose.model("todo",list);

module.exports=todo;