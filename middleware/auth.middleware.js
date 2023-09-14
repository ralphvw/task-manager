import { db } from '../db/db.js';
import userQueries from '../queries/user.js';
import ResponseHelper from '../helper/response.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET = process.env.SECRET;

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

const checkToken = (req, res, next) => {
  try {
    const token = req.headers['authorization'];
    if (!token) {
      return sendResponse(res, null, 'You are not logged in!', 400);
    }
    req.token = token;
    return next();
  } catch (error) {
    console.log({ error });
    return sendResponse(res, null, 'Oops... something went wrong!', 500);
  }
};

const verifyToken = (req, res, next) => {
  try {
    const user = jwt.verify(req.token, SECRET);
    if (!user) {
      return sendResponse(
        res,
        null,
        'You are not authorized to make this request!',
        401
      );
    }
    req.user = user;
    return next();
  } catch (error) {
    console.log({ error });
    return sendResponse(res, null, 'Oops... something went wrong!', 500);
  }
};

export default {
  checkIfUserExists,
  checkPassword,
  checkToken,
  verifyToken,
};
