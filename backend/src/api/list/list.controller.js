const listService = require('./list.service');

const createList = async (req, res) => {
  const { boardId } = req.params;
  const { title, position } = req.body;
  try {
    const newList = await listService.createList({ title, boardId, position });
    res.status(201).json(newList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getLists = async (req, res) => {
  const { boardId } = req.params;
  try {
    const lists = await listService.getListsByBoardId(boardId);
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getList = async (req, res) => {
  const { listId } = req.params;
  try {
    const list = await listService.getListById(listId);
    res.status(200).json(list);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

const updateList = async (req, res) => {
  const { listId } = req.params;
  const { title, position } = req.body;
  try {
    const updatedList = await listService.updateList(listId, title, position);
    res.status(200).json(updatedList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const deleteList = async (req, res) => {
  const { listId } = req.params;
  try {
    const response = await listService.deleteListById(listId);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createList,
  getLists,
  getList,
  updateList,
  deleteList,
}