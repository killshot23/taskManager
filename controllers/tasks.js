//const express = require('express')
const asyncWrapper = require("../middleware/async");
const { json } = require("body-parser");
const Task = require("../models/Task");
const createCustomError = require("../errors/custom-errors");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks }); //since we are in es6 we don't need to write like tasks: tasks
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTaskByID = asyncWrapper(async (req, res,next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOne({ _id: taskId });
  if (!task) {
    return next(createCustomError( `no task with the id: ${taskId} was found` ,404)); 
     
  }
  res.status(200).json({ task });
});

const deleteTaskByID = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskId });
  if (!task) {
    return next(createCustomError( `no task with the id: ${taskId} was found` ,404));
  }
  return res.status(200).json({ task });
});

const updateTaskByID = asyncWrapper(async (req, res) => {
  //we need to pass options while updating because while creating the model we set some validations
  // those we need to make sure are followed here

  const { id: taskId } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError( `no task with the id: ${taskId} was found` ,404));
  }
  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  getTaskByID,
  createTask,
  updateTaskByID,
  deleteTaskByID,
};
