const url = process.env.SERVER_URL || 'http://localhost:5000';

const roomUserUrl = () => {
  return `${url}/api/v1/room-user`;
};

const authenticateUrl = () => {
  return `${url}/api/public/authenticate`;
};

const userUrl = () => {
  return `${url}/api/v1/user`;
};

const logoutUrl = () => {
  return `${url}/api/public/logout`;
};

const registerUrl = () => {
  return `${url}/api/public/register`;
};

const visitedUsersUrl = () => {
  return `${url}/api/v1/visted-users`;
};

export {
  roomUserUrl,
  authenticateUrl,
  userUrl,
  registerUrl,
  logoutUrl,
  visitedUsersUrl,
  url
};
