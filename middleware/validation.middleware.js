import ResponseHelper from '../helper/response.js';

const { sendResponse } = ResponseHelper;

const createUserInputValidation = (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (typeof email !== 'string' || !email.includes('@')) {
      return sendResponse(res, null, 'Invalid email', 400);
    }

    if (typeof password !== 'string' || password.length < 8) {
      return sendResponse(res, null, 'Invalid password', 400);
    }
    
    return next();
  } catch (error) {
    return next(error);
  }
};

export default {
  createUserInputValidation,
};
