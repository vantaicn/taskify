const express = require('express');
const router = express.Router({ mergeParams: true });
const memberController = require('./board_member.controller');
const boardMiddleware = require('../../middlewares/board.middleware');

router.post('/', boardMiddleware.checkBoardAdmin, memberController.addMember);
router.get('/', memberController.getMembers);
router.put('/:memberId', boardMiddleware.checkBoardAdmin, memberController.updateMemberRole);
router.delete('/:memberId', memberController.deleteMember);

module.exports = router;
