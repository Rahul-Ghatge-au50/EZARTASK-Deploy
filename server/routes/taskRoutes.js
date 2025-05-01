const express = require('express');
const {getTasks,addTask,updateTask,deleteTask,getSingleTask} = require("../controllers/taskController");
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();


router.get('/:userId',authMiddleware,getTasks);
router.post('/',authMiddleware,addTask);
router.put('/:id',authMiddleware,updateTask);
router.delete('/:id',authMiddleware,deleteTask);
router.get('/getSingle/:id',authMiddleware,getSingleTask);

module.exports = router;