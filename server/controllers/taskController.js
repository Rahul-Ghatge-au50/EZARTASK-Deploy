const Task = require('../models/Task');
const { ObjectId } = require('mongoose').Types;
const moment = require("moment");



const getTasks = async (req,res) => {
    try{
        const aggregateQuery = [
            {
                $match:{
                    userId:new ObjectId(req.params.userId),
                }
            },
            {
                $sort:{
                    _id:-1
                }
            }
        ]
        if(req.query.status){
            aggregateQuery.unshift({
                $match:{
                    status:req.query.status
                }
            })
        }
        if(req.query.title){
            aggregateQuery.unshift({
                $match:{
                    title:{$regex:req.query.title,$options:'i'}
                }
            })
        }
        let tasks = await Task.aggregate(aggregateQuery);

        tasks = tasks.map(task => ({
            ...task,
            dueDate:task.dueDate ? moment(task.dueDate).format('DD-MM-YYYY') : ''
        }))

        res.status(200).json({
            result:tasks,
        })
    }catch(error){
        res.status(500).json({message:"Internal Server error"});
    }
};

const addTask = async (req,res) => {
    try{
        const {title,status,description,dueDate} = req.body;

        const newTask = await new Task({
            title,status,description,dueDate,userId:req.body.userId
        });
        await newTask.save();

        res.status(200).json({message:"Task is added Successfully"});
    }catch(error){
        res.status(500).json({message:"Internal Server error"});
    }
};


const updateTask = async (req,res) => {
    try{
        const {title,status,description,dueDate} = req.body;

        const task = await Task.findById(req.params.id);
        if(!task) return res.status(401).json({message:"Task not found"});

        if(task.userId.toString() !== req.body.userId){
            return res.status(401).json({message:"Not authorized"})
        };

        const updated = await Task.updateOne(
            {_id:req.params.id},
            {
                $set:{
                    title:title || task.title,
                    status:status || task.status,
                    description:description|| task.description,
                    dueDate:dueDate || task.dueDate
                }
            }
        )

        res.status(200).json({message:"Task is updated Successfully"});
    }catch(error){
        res.status(500).json({message:"Internal Server error"});
    }
};

const deleteTask = async (req,res) => {
    try{
        const task = await Task.findById(req.params.id);
        if(!task) return res.status(401).json({message:"Task not found"});

        await Task.deleteOne({_id:req.params.id});

        res.status(200).json({message:"Task id Deleted"});
    }catch(error){
        res.status(500).json({message:"Internal Server error"});
    }
};

const getSingleTask = async (req,res) => {
    try{
        const task = await Task.findOne({_id:req.params.id});

        if(!task) return res.status(401).json({message:"Task not found"});

        const taskObj = task.toObject();
        taskObj.dueDate = taskObj.dueDate ? moment(taskObj.dueDate).format('YYYY-MM-DD') : '';

        res.status(200).json({
            result:taskObj,
        })
    }catch(error){
        res.status(500).json({message:"Internal Server error"});
    }
};


module.exports = {getTasks,addTask,updateTask,deleteTask,getSingleTask}