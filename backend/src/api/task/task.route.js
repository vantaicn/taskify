const express = require("express");
const taskNestedRoutes = express.Router({ mergeParams: true });
const taskFlatRoutes = express.Router();
const assigneeRouter = require("../assignee/assignee.route");
const { checklistNestedRoutes } = require("../checklist/checklist.route");
const { attachmentNestedRoutes } = require("../attachment/attachment.route");
const taskController = require("./task.controller");

// Nested routes: /lists/:listId/tasks
taskNestedRoutes.post("/", taskController.createTask);
taskNestedRoutes.get("/", taskController.getTasks);

// Flat routes: /tasks
taskFlatRoutes.get("/:taskId", taskController.getTask);
taskFlatRoutes.patch("/:taskId", taskController.updateTask);
taskFlatRoutes.delete("/:taskId", taskController.deleteTask);
taskFlatRoutes.patch("/:taskId/position", taskController.updateTaskPosition);
taskFlatRoutes.patch("/:taskId/move", taskController.moveTask);

// Assignee routes
taskFlatRoutes.use("/:taskId/assignees", assigneeRouter);

// Checklist routes
taskFlatRoutes.use("/:taskId/checklists", checklistNestedRoutes);

// Attachment routes
taskFlatRoutes.use("/:taskId/attachments", attachmentNestedRoutes);

module.exports = {
  taskNestedRoutes,
  taskFlatRoutes
};
