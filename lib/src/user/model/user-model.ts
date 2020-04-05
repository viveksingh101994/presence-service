import * as mongoose from 'mongoose';
import * as crypto from 'crypto';
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  displayName: {
    type: String,
    required: true
  },
  uid: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  hash: {
    type: String
  },
  salt: {
    type: String
  },
  avatarUrl: {
    type: String
  },
  lastLogin: {
    type: String
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  isDashboardVisited: {
    type: Boolean
  },

  isConnected: {
    type: Boolean
  }
});

export const setPassword = (password) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return {
    salt,
    hash
  };
};

export const validPassword = (password, savedHash, salt) => {
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return savedHash === hash;
};

const Model = mongoose.model('user', UserSchema);
export const userModel = Model;
