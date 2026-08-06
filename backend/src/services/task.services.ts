import TaskRepository from "../repositories/task.repositories.js";

const TaskService = {
  addTask: async (task: string) => {
    return TaskRepository.addTask(task);
  },
};

export default TaskService;
