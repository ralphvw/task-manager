import { db } from '../db/db.js';
import userQueries from '../queries/user.js';
import ResponseHelper from '../helper/response.js';
import bcrypt from 'bcrypt';

const { findUserByEmail } = userQueries;
const { sendResponse } = ResponseHelper;

const checkIfUserExists = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await db.oneOrNone(findUserByEmail, [email]);
    if (!user) {
      return sendResponse(res, null, 'Wrong email or password', 401);
    }
    req.user = user;
    return next();
  } catch (error) {
    console.log('Error: ', error.message);
    return sendResponse(res, null, 'Wrong email or password', 400);
  }
};

const checkPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const hash = req.user.password;
    if (!bcrypt.compareSync(password, hash)) {
      return sendResponse(res, null, 'Wrong email or password', 401);
    }
    return next();
  } catch (error) {
    console.log('Error: ', error.message);
    return sendResponse(res, null, 'Wrong email or password', 400);
  }
};

export default {
  checkIfUserExists,
  checkPassword,
};
