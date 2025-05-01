const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title:{type:String,required:true},
    status:{type:String,enum:['To Do','In Progress','Done'],default:"To Do"},
    description:{type:String},
    dueDate:{type:Date},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}
});


module.exports = mongoose.model('Task',taskSchema);