import UserService from '../services/user.js';
import ResponseHelper from '../helper/response.js';
import dotenv from 'dotenv';

dotenv.config();

const { createUserService, loginService } = UserService;
const { sendResponse } = ResponseHelper;

// eslint-disable-next-line no-undef
const SECRET = process.env.SECRET;

const createUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await createUserService(email, password);
    return sendResponse(res, data, 'User created successfully', 201);
  } catch (error) {
    console.log('Error:', error.message);
    return error.message.includes('duplicate')
      ? sendResponse(res, null, 'Email already exists!', 500)
      : sendResponse(res, null, 'Oops.. something broke on the server!', 500);
  }
};

const loginController = (req, res) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const { password, ...user } = req.user;
    const token = loginService(user, SECRET);
    return sendResponse(
      res,
      { user, token },
      'You have signed in successfully',
      200
    );
  } catch (error) {
    console.log('Error: ', error.message);
    return sendResponse(
      res,
      null,
      'Oops... something broke on the server',
      500
    );
  }
};

export default {
  createUserController,
  loginController,
};
