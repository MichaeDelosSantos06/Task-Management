import prisma from "../lib/prisma.js";

const TaskRepository = {
  addTask: async (task: string) => {
    return prisma.task.create({
      data: { task },
    });
  },
};

export default TaskRepository;
