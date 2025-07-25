const express = require('express');
const boardController = require('./board.controller');
const boardValidation = require('./board.validation');
const validateMiddleware = require('../../middlewares/validate.middleware');

const router = express.Router();

router.get('/', boardController.getBoards);
router.post('/', validateMiddleware(boardValidation.createBoardRequest), boardController.createBoard);
router.get('/:id', validateMiddleware(boardValidation.getBoardRequest, 'params'), boardController.getBoard);
router.put('/', validateMiddleware(boardValidation.updateBoardRequest), boardController.updateBoard);
router.delete('/:id', validateMiddleware(boardValidation.deleteBoardRequest, 'params'), boardController.deleteBoard);

module.exports = router;
