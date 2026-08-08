import TaskRepository from "../repositories/task.repositories.js";
import { AppError } from "../utils/appError.js";

const TaskService = {
  // Add new task
  addTask: async (task: string) => {
    return TaskRepository.addTask(task);
  },

  // Retrieve all task
  retrieveTask: async () => {
    return TaskRepository.retrieveTask();
  },

  // Updated and Validate existing task
  updateTask: async (
    taskId: number,
    data: { task?: string; isActive?: boolean; completedAt?: Date | null },
  ) => {
    const checkExisting = await TaskRepository.findTaskById(taskId);
    if (!checkExisting) {
      throw new AppError("Task not found", 404);
    }

    return TaskRepository.updateTask(taskId, data);
  },

  // Delete existing task
  deleteTask: async (taskId: number) => {
    const checkExisting = await TaskRepository.findTaskById(taskId);
    if (!checkExisting) {
      throw new AppError("Task not found", 404);
    }

    return TaskRepository.deleteTask(taskId);
  },
};

export default TaskService;
