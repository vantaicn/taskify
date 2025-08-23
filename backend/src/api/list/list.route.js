const express = require("express");
const listNestedRoutes = express.Router({ mergeParams: true });
const listFlatRoutes = express.Router();
const listController = require("./list.controller");
const listValidation = require("./list.validation");
const {
  checkBoardAccess,
  checkBoardAdmin,
} = require("../../middlewares/board.middleware");
const { loadAndAttachList } = require("../../middlewares/list.middleware");
const { taskNestedRoutes } = require("../task/task.route");

// Nested routes: /boards/:boardId/lists
listNestedRoutes.post("/", checkBoardAdmin, listController.createList);
listNestedRoutes.get("/", listController.getLists);

// Flat routes: /lists
listFlatRoutes.param("listId", (req, res, next) => {
  return loadAndAttachList(req, res, next);
});

listFlatRoutes.get(
  "/:listId",
  checkBoardAccess,
  listController.getList
);
listFlatRoutes.put(
  "/:listId",
  checkBoardAdmin,
  listController.updateListTitle
);
listFlatRoutes.delete(
  "/:listId",
  checkBoardAdmin,
  listController.deleteList
);
listFlatRoutes.put(
  "/:listId/position",
  checkBoardAdmin,
  listController.updateListPosition
);

listFlatRoutes.use(
  "/:listId/tasks",
  checkBoardAccess,
  taskNestedRoutes
);

module.exports = {
  listNestedRoutes,
  listFlatRoutes,
};
