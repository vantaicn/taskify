const listService = require("./list.service");

const createList = async (req, res) => {
  const { boardId } = req.params;
  const { title, position } = req.body;
  try {
    const newList = await listService.createList({ title, boardId, position });
    res.status(201).json(newList);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const getLists = async (req, res) => {
  const { boardId } = req.params;
  try {
    const lists = await listService.getListsByBoardId(boardId);
    res.status(200).json(lists);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const getList = async (req, res) => {
  const { listId } = req.params;
  try {
    const list = await listService.getListById(listId);
    res.status(200).json(list);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const updateListTitle = async (req, res) => {
  const { listId } = req.params;
  const { title } = req.body;
  try {
    const updatedCount = await listService.updateListTitle(listId, title);
    res.status(200).json({ message: `${updatedCount} list(s) updated` });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const updateListPosition = async (req, res) => {
  const { listId } = req.params;
  const { position } = req.body;
  try {
    const updatedCount = await listService.updateListPosition(listId, position);
    res.status(200).json({ message: `${updatedCount} list(s) updated` });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const deleteList = async (req, res) => {
  const { listId } = req.params;
  try {
    const deletedCount = await listService.deleteListById(listId);
    res.status(200).json({ message: `${deletedCount} list(s) deleted` });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

module.exports = {
  createList,
  getLists,
  getList,
  updateListTitle,
  updateListPosition,
  deleteList,
};
