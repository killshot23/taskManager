const express = require('express');
const router = express.Router();

//controllers are required here
const {getAllTasks,getTaskByID,createTask,updateTaskByID,deleteTaskByID} = require('../controllers/tasks');

router.route('/').get(getAllTasks);
router.route('/').post(createTask);

router.route('/:id').get(getTaskByID);
router.route('/:id').patch(updateTaskByID);
router.route('/:id').delete(deleteTaskByID);

module.exports = router;