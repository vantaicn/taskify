const express = require("express");
const taskNestedRoutes = express.Router({ mergeParams: true });
const taskFlatRoutes = express.Router();
const taskController = require("./task.controller");

// Nested routes: /lists/:listId/tasks
taskNestedRoutes.post("/", taskController.createTask);
taskNestedRoutes.get("/", taskController.getTasks);

// Flat routes: /tasks
taskFlatRoutes.get("/:taskId", taskController.getTask);
taskFlatRoutes.put("/:taskId", taskController.updateTaskTitle);
taskFlatRoutes.delete("/:taskId", taskController.deleteTask);
taskFlatRoutes.put("/:taskId/position", taskController.updateTaskPosition);
taskFlatRoutes.put("/:taskId/move", taskController.moveTask);

module.exports = {
  taskNestedRoutes,
  taskFlatRoutes
};
