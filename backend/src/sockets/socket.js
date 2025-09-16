const {Server} = require('socket.io');

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"],
    }
  });

  io.on('connection', (socket) => {
    console.log('New client connected: ', socket.id);

    socket.on('disconnect', (reason) => {
      console.log('Disconnected: ', socket.id, 'Reason: ', reason);
    });

    socket.on('join-board', (boardId) => {
      socket.join(boardId);
      console.log(`Socket ${socket.id} joined board ${boardId}`);
    });

    socket.on('leave-board', (boardId) => {
      socket.leave(boardId);
      console.log(`Socket ${socket.id} left board ${boardId}`);
    });

    socket.on('list-created', (boardId) => {
      console.log(`List created in board ${boardId}`);
      socket.to(boardId).emit('list-created');
    });

    socket.on('list-updated', (boardId) => {
      console.log(`List updated in board ${boardId}`);
      socket.to(boardId).emit('list-updated');
    });

    socket.on('list-deleted', (boardId) => {
      console.log(`List deleted in board ${boardId}`);
      socket.to(boardId).emit('list-deleted');
    });

    socket.on('task-created', (boardId) => {
      console.log(`Task created in board ${boardId}`);
      socket.to(boardId).emit('task-created');
    });

    socket.on('task-updated', (boardId, taskId) => {
      console.log(`Task updated in board ${boardId}`);
      socket.to(boardId).emit('task-updated', taskId);
    });

    socket.on('task-moved', (boardId) => {
      console.log(`Task moved in board ${boardId}`);
      socket.to(boardId).emit('task-moved', boardId);
    });

    socket.on('task-position-updated', (boardId) => {
      console.log(`Task position updated in board ${boardId}`);
      socket.to(boardId).emit('task-position-updated', boardId);
    });

    socket.on('task-deleted', (boardId) => {
      console.log(`Task deleted in board ${boardId}`);
      socket.to(boardId).emit('task-deleted', boardId);
    });

    socket.on('assignee-added', (boardId, taskId) => {
      console.log(`Assignee added in board ${boardId}`);
      socket.to(boardId).emit('assignee-added', boardId, taskId);
    });

    socket.on('assignee-removed', (boardId, taskId) => {
      console.log(`Assignee removed in board ${boardId}`);
      socket.to(boardId).emit('assignee-removed', boardId, taskId);
    });

    socket.on('checklist-added', (boardId, taskId) => {
      console.log(`Checklist added in task ${taskId}`);
      socket.to(boardId).emit('checklist-added', taskId);
    });

    socket.on('checklist-updated', (boardId, taskId) => {
      console.log(`Checklist updated in task ${taskId}`);
      socket.to(boardId).emit('checklist-updated', taskId);
    });

    socket.on('checklist-deleted', (boardId, taskId) => {
      console.log(`Checklist deleted in task ${taskId}`);
      socket.to(boardId).emit('checklist-deleted', taskId);
    });

    socket.on('attachment-added', (boardId, taskId) => {
      console.log(`Attachment added in task ${taskId}`);
      socket.to(boardId).emit('attachment-added', taskId);
    });

    socket.on('attachment-updated', (boardId, taskId) => {
      console.log(`Attachment updated in task ${taskId}`);
      socket.to(boardId).emit('attachment-updated', taskId);
    });

    socket.on('attachment-removed', (boardId, taskId) => {
      console.log(`Attachment removed in task ${taskId}`);
      socket.to(boardId).emit('attachment-removed', taskId);
    });

  });

  return io;
}

module.exports = { initSocket };