const boardService = require('./board.service');

const getBoards = async (req, res) => {
  const userId = req.user.id;
  try {
    const boards = await boardService.getBoardsByUserId(userId);
    res.status(200).json(boards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getBoard = async (req, res) => {
  const boardId = req.params.id;
  try {
    const board = await boardService.getBoardById(boardId);
    res.status(200).json(board);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

const createBoard = async (req, res) => {
  const userId = req.user.id;
  console.log('Creating board for user:', req.user);
  const { title, description } = req.body;
  try {
    const newBoard = await boardService.createBoard({ title, description, owner: userId });
    res.status(201).json(newBoard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const updateBoard = async (req, res) => {
  const { id, title, description } = req.body;
  try {
    const updatedBoard = await boardService.updateBoard(id, title, description);
    res.status(200).json(updatedBoard);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

const deleteBoard = async (req, res) => {
  const boardId = req.params.id;
  try {
    const result = await boardService.deleteBoardById(boardId);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

module.exports = {
  getBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard,
};