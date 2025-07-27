const express = require('express');
const router = express.Router({ mergeParams: true });
const assigneeController = require('./assignee.controller');

router.post('/', assigneeController.addAssignee);
router.get('/', assigneeController.getAssignees);
router.delete('/:assigneeId', assigneeController.deleteAssignee);

module.exports = router;