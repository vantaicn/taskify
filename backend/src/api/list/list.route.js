const express = require("express");
const router = express.Router({ mergeParams: true });
const listController = require("./list.controller");
const listValidation = require("./list.validation");
const boardMiddleware = require("../../middlewares/board.middleware");

router.post("/", boardMiddleware.checkBoardAdmin, listController.createList);
router.get("/", listController.getLists);
router.get("/:listId", listController.getList);
router.put(
  "/:listId",
  boardMiddleware.checkBoardAdmin,
  listController.updateListTitle
);
router.delete(
  "/:listId",
  boardMiddleware.checkBoardAdmin,
  listController.deleteList
);
router.put(
  "/:listId/position",
  boardMiddleware.checkBoardAdmin,
  listController.updateListPosition
);

module.exports = router;
