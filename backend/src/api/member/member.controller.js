const memberService = require('./member.service');

const addMember = async (req, res) => {
  const boardId = req.params.boardId;
  const { userId } = req.body;
  try {
    const newMember = await memberService.addMemberToBoard(boardId, userId);
    res.status(201).json(newMember);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getMembers = async (req, res) => {
  const boardId = req.params.boardId;
  try {
    const members = await memberService.getMembersByBoardId(boardId);
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const updateMemberRole = async (req, res) => {
  const memberId = req.params.memberId;
  const { role } = req.body;
  const currentUserId = req.user.id;
  const boardId = req.params.boardId;
  try {
    const updatedMember = await memberService.updateMemberRole(memberId, role, currentUserId, boardId);
    res.status(200).json(updatedMember);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const deleteMember = async (req, res) => {
  const memberId = req.params.memberId;
  const currentUserId = req.user.id;
  const boardId = req.params.boardId;
  try {
    const result = await memberService.deleteMemberById(memberId, currentUserId, boardId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  addMember,
  getMembers,
  updateMemberRole,
  deleteMember
}