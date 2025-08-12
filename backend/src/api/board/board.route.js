const express = require("express");
const router = express.Router();
const boardController = require("./board.controller");
const boardValidation = require("./board.validation");
const validateMiddleware = require("../../middlewares/validate.middleware");
const boardMiddleware = require("../../middlewares/board.middleware");
const listRoutes = require("../list/list.route");
const memberRoutes = require("../board_member/board_member.route");
const taskRoutes = require("../task/task.route");

// Board CRUD
router.get("/", boardController.getBoards);
router.post(
  "/",
  validateMiddleware(boardValidation.createBoardRequest),
  boardController.createBoard
);
router.get(
  "/:boardId",
  validateMiddleware(boardValidation.getBoardRequest, "params"),
  boardMiddleware.checkBoardAccess,
  boardController.getBoard
);
router.put(
  "/:boardId",
  validateMiddleware(boardValidation.updateBoardRequest),
  boardMiddleware.checkBoardAdmin,
  boardController.updateBoard
);
router.delete(
  "/:boardId",
  validateMiddleware(boardValidation.deleteBoardRequest, "params"),
  boardMiddleware.checkBoardAdmin,
  boardController.deleteBoard
);

// Nested routes
router.use("/:boardId/lists", boardMiddleware.checkBoardAccess, listRoutes);
router.use("/:boardId/tasks", boardMiddleware.checkBoardAccess, taskRoutes);
router.use("/:boardId/members", boardMiddleware.checkBoardAccess, memberRoutes);

module.exports = router;
