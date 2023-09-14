import ResponseHelper from '../helper/response.js';
import TaskQueries from '../queries/task.js';
import { db } from '../db/db.js';

const { sendResponse } = ResponseHelper;
const { fetchTaskUser } = TaskQueries;

const checkValidUser = async (req, res, next) => {
  try {
    const user = req.user;
    const { taskId } = req.params;

    const { userId } = await db.oneOrNone(fetchTaskUser, [taskId]);

    return user.id == userId
      ? next()
      : sendResponse(
          res,
          null,
          'You are not authorized to make this request',
          401
        );
  } catch (error) {
    console.log({ error });
    return sendResponse(res, null, 'Oops.. something went wrong!', 500);
  }
};

export default {
  checkValidUser,
};
