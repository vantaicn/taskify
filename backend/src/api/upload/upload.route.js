const express = require("express");
const router = express.Router();
const uploadController = require("./upload.controller");

router.post("/avatar", uploadController.uploadAvatar);

router.post("/attachment", uploadController.uploadAttachment);

router.post("/board-background", uploadController.uploadBoardBackground);

router.post("/multiple", uploadController.uploadMultipleFiles);

router.delete("/", uploadController.deleteFile);

module.exports = router;