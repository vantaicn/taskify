const express = require("express");
const router = express.Router();
const boardController = require("./board.controller");
const boardValidation = require("./board.validation");
const validateMiddleware = require("../../middlewares/validate.middleware");
const listRoutes = require("../list/list.route");
const memberRoutes = require("../member/member.route");
const boardMiddleware = require("../../middlewares/board.middleware");

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
router.use("/:boardId/members", boardMiddleware.checkBoardAccess, memberRoutes);

module.exports = router;
