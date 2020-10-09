var express = require('express');
const TaskController = require('../controllers/TasksController');
const TaskModel = require('../models/Task');

var router = express.Router();

router.get('/tasks/all', TaskController.showAll);
router.post('/tasks/add', TaskController.store);
router.get('/tasks/:id', TaskController.findById);
router.put('/tasks/:id/done', TaskController.changeStatus);
router.delete('/tasks/:id/delete', TaskController.deleteTask);

module.exports = router;