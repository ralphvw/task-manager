import ResponseHelper from '../helper/response.js';
import TaskService from '../services/task.js';

const { createTaskService, getAllTasks, completeTask } = TaskService;
const { sendResponse } = ResponseHelper;

const createTaskController = async (req, res) => {
  try {
    const { title, description } = req.body;
    const data = await createTaskService(title, description, req.user.id);
    return sendResponse(res, data, 'Task created sucessfully!', 201);
  } catch (error) {
    return sendResponse(res, null, 'Oops.. something broke on the server', 500);
  }
};

const getAllTasksController = async (req, res) => {
  try {
    const { search } = req.query;
    const data = await getAllTasks(search);
    return sendResponse(res, data, 'Tasks fetched successfully', 200);
  } catch (error) {
    console.log({ error });
    return sendResponse(res, null, 'Oops.. something broke on the server', 500);
  }
};

const completeTaskController = async (req, res) => {
  try {
    const { taskId } = req.params;
    const data = await completeTask(taskId);
    return sendResponse(res, data, 'Task updated successfully', 200);
  } catch (error) {
    console.log({ error });
    return sendResponse(res, null, 'Oops.. something broke on the server', 500);
  }
};

export default {
  createTaskController,
  getAllTasksController,
  completeTaskController,
};
