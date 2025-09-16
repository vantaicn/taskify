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
    
    socket.on('task-updated', (boardId) => {
      console.log(`Task updated in board ${boardId}`);
      socket.to(boardId).emit('task-updated');
    });

    socket.on('task-moved', (boardId) => {
      console.log(`Task moved in board ${boardId}`);
      socket.to(boardId).emit('task-moved', boardId);
    });

    socket.on('task-position-updated', (boardId) => {
      console.log(`Task position updated in board ${boardId}`);
      socket.to(boardId).emit('task-position-updated', boardId);
    });
  });
}

module.exports = { initSocket };