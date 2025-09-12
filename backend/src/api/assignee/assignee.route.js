const express = require('express');
const router = express.Router({ mergeParams: true });
const assigneeController = require('./assignee.controller');

router.post('/', assigneeController.addAssignee);
router.get('/', assigneeController.getAssignees);
router.delete('/:userId', assigneeController.deleteAssignee);

module.exports = router;