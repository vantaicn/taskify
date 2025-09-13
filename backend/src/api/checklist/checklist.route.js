const express = require("express");
const checklistNestedRoutes = express.Router({ mergeParams: true });
const checklistFlatRoutes = express.Router();
const checklistController = require("./checklist.controller");

// Nested routes: /tasks/:taskId/checklists
checklistNestedRoutes.post("/", checklistController.createChecklist);
checklistNestedRoutes.get("/", checklistController.getChecklists);

// Flat routes: /checklists
checklistFlatRoutes.get("/:checklistId", checklistController.getChecklist);
checklistFlatRoutes.patch("/:checklistId", checklistController.updateChecklist);
checklistFlatRoutes.delete("/:checklistId", checklistController.deleteChecklist);
checklistFlatRoutes.patch("/:checklistId/position", checklistController.updateChecklistPosition);

module.exports = {
  checklistNestedRoutes,
  checklistFlatRoutes
};