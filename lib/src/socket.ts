import * as socketIO from 'socket.io';
import { jwt } from './common/jwt';
import { getCookie, insertUserInRoom, getRoomUsers, userLeave } from './common';
import { UserQueries } from './user/user-queries';
export const ioConnection = (server) => {
  const io = socketIO(server);
  io.on('connection', async (socket) => {
    const authCookie = getCookie(socket.request, 'auth');
    if (!authCookie) {
      return;
    }
    try {
      const users = await getSocketActiveUsers(authCookie, true);
      io.emit('roomUsers', {
        users
      });
    } catch (err) {
      console.log('socket connection', err);
    }
    socket.on('disconnect', async () => {
      const users = await getSocketActiveUsers(authCookie, false);
      io.broadcast.emit('roomUsers', {
        users
      });
    });
  });
};

const onConnection = async (socket) => {
  const authCookie = getCookie(socket.request, 'auth');
  let jwtDecoded;
  if (!authCookie) {
    return;
  }
  try {
    const jwtDecoded = await jwt.verifyandDecodeJwt(authCookie);
    const a = await UserQueries.updateIsConnected(jwtDecoded, true);
    const users = await UserQueries.getActiveUsers();
    io.emit('roomUsers', {
      users
    });
  } catch (err) {
    console.log('socket connection', err);
  }
  socket.on('disconnect', async () => {
    const jwtDecoded = await jwt.verifyandDecodeJwt(authCookie);
    await UserQueries.updateIsConnected(jwtDecoded, false);
    const users = await UserQueries.getActiveUsers();
    io.broadcast.emit('roomUsers', {
      users
    });
  });
};

async function getSocketActiveUsers(authCookie: string, isConnected: boolean) {
  const jwtDecoded = await jwt.verifyandDecodeJwt(authCookie);
  await UserQueries.updateIsConnected(jwtDecoded, isConnected);
  const users = await UserQueries.getActiveUsers();
  return users;
}
