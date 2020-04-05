export const socketMiddleWare = (req, res, next) => {
  const connection = req.app.get('socketConnection');
  connection.on('connection', (socket) => {
    socket.broadcast.emit('room', req.user);
    socket.on('disconnect', () => {
      connection.emit('room', 'A user has left the chat');
    });
  });
};
