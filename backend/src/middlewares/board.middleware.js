const memberService = require('../api/member/member.service');

const checkBoardAccess = (req, res, next) => {
  const boardId = req.params.boardId;
  const userId = req.user.id;

  memberService.isMemberOfBoard(boardId, userId)
    .then(isMember => {
      if (!isMember) {
        return res.status(403).json({ message: 'Access denied. User is not a member of the board.' });
      }
      next();
    })
    .catch(error => {
      res.status(500).json({ message: error.message || 'Error checking board access' });
    });
}

const checkBoardAdmin = (req, res, next) => {
  const boardId = req.params.boardId;
  const userId = req.user.id;

  memberService.isAdminOfBoard(boardId, userId)
    .then(isAdmin => {
      if (!isAdmin) {
        return res.status(403).json({ message: 'Access denied. User is not an admin of the board.' });
      }
      next();
    })
    .catch(error => {
      res.status(500).json({ message: error.message || 'Error checking board admin status' });
    });
}

module.exports = {
  checkBoardAccess,
  checkBoardAdmin,
}