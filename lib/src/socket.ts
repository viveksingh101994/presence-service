import * as socketIO from 'socket.io';
import { jwt } from './common/jwt';
import { getCookie, insertUserInRoom, getRoomUsers, userLeave } from './common';
export const ioConnection = (server) => {
  const io = socketIO(server);
  io.on('connection', async (socket) => {
    const authCookie = getCookie(socket.request, 'auth');
    let jwtDecoded;
    if (!authCookie) {
      return;
    }
    try {
      jwtDecoded = await jwt.verifyandDecodeJwt(authCookie);
      insertUserInRoom({ ...jwtDecoded, id: socket.id });
      io.emit('roomUsers', {
        users: getRoomUsers()
      });
    } catch (err) {
      console.log('socket connection', err);
    }
    socket.on('disconnect', () => {
      const user = userLeave(socket.id);

      if (user) {
        // Send users and room info
        io.emit('roomUsers', {
          users: getRoomUsers()
        });
      }
    });
  });
};
