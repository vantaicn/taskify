const boardService = require('./board.service');

const createBoard = async (req, res) => {
  const userId = req.user.id;
  const { title, description } = req.body;
  try {
    const newBoard = await boardService.createBoard({ title, description, ownerId: userId });
    res.status(201).json(newBoard);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
}

const getBoards = async (req, res) => {
  const userId = req.user.id;
  try {
    const boards = await boardService.getBoardsByUserId(userId);
    res.status(200).json(boards);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
}

const getSharedBoards = async (req, res) => {
  const userId = req.user.id;
  try {
    const boards = await boardService.getSharedBoardsByUserId(userId);
    res.status(200).json(boards);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
}

const getBoard = async (req, res) => {
  const boardId = req.params.boardId;
  try {
    const board = await boardService.getBoardById(boardId);
    res.status(200).json(board);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
}

const updateBoard = async (req, res) => {
  const boardId = req.params.boardId;
  const { title, description } = req.body;
  try {
    const updatedCount = await boardService.updateBoard(boardId, title, description);
    res.status(200).json({ message: `${updatedCount} board(s) updated` });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
}

const deleteBoard = async (req, res) => {
  const boardId = req.params.boardId;
  try {
    const deletedCount = await boardService.deleteBoardById(boardId);
    res.status(200).json({ message: `${deletedCount} board(s) deleted` });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
}

module.exports = {
  getBoards,
  getSharedBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard,
};