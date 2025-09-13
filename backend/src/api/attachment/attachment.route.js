const express = require("express");
const attachmentNestedRoutes = express.Router({ mergeParams: true });
const attachmentFlatRoutes = express.Router();
const attachmentController = require("./attachment.controller");

// Nested routes: /tasks/:taskId/attachments
attachmentNestedRoutes.post("/", attachmentController.createAttachment);
attachmentNestedRoutes.get("/", attachmentController.getAttachments);

// Flat routes: /attachments
attachmentFlatRoutes.get("/:attachmentId", attachmentController.getAttachment);
attachmentFlatRoutes.get("/:attachmentId/download", attachmentController.downloadAttachment);
attachmentFlatRoutes.patch("/:attachmentId", attachmentController.updateAttachment);
attachmentFlatRoutes.delete("/:attachmentId", attachmentController.deleteAttachment);

module.exports = {
  attachmentNestedRoutes,
  attachmentFlatRoutes
};