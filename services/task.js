import { db } from '../db/db.js';
import taskQueries from '../queries/task.js';

const { createTask, fetchAllTasks, setCompleted } = taskQueries;

const createTaskService = async (title, description, userId) => {
  return db.one(createTask, [title, description, userId]);
};

const getAllTasks = async (search) => {
  return db.manyOrNone(fetchAllTasks, [`%${search}%`]);
};

const completeTask = async (id) => {
  return db.oneOrNone(setCompleted, [id]);
};

export default {
  createTaskService,
  getAllTasks,
  completeTask,
};
