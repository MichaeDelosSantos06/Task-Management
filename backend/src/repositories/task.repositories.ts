import prisma from "../lib/prisma.js";

const TaskRepository = {
  addTask: async (task: string) => {
    return prisma.task.create({
      data: { task },
    });
  },

  retrieveTask: async () => {
    return prisma.task.findMany({
      select: {
        id: true,
        task: true,
        isActive: true,
        completedAt: true,
      },
    });
  },

  updateTask: async (
    taskId: number,
    data: {
      task?: string;
      isActive?: boolean;
      completedAt?: Date | null;
    },
  ) => {
    return prisma.task.update({
      where: { id: taskId },
      data,
    });
  },

  findTaskById: async (taskId: number) => {
    return prisma.task.findUnique({
      where: { id: taskId },
    });
  },

  deleteTask: async (taskId: number) => {
    return prisma.task.delete({
      where: { id: taskId },
    });
  },
};

export default TaskRepository;
