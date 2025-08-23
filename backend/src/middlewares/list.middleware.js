const listService = require("../api/list/list.service");

async function loadAndAttachList(req, res, next) {
  const { listId } = req.params;
  try {
    const list = await listService.getListById(listId);
    if (!list) {
      return res.status(404).json({ error: 'List not found' });
    }
    req.params.boardId = list.boardId;
    return next();
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
}

module.exports = {
  loadAndAttachList
};
