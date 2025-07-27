const express = require("express");
const router = express.Router({ mergeParams: true });
const taskController = require("./task.controller");

router.post("/", taskController.createTask);
router.get("/", taskController.getTasks);
router.get("/:taskId", taskController.getTask);
router.put("/:taskId", taskController.updateTask);
router.delete("/:taskId", taskController.deleteTask);

router.put("/:taskId/position", taskController.updateTaskPosition);
router.put("/:taskId/move", taskController.moveTask);

module.exports = router;
