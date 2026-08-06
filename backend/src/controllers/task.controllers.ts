import TaskService from "../services/task.services.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import type { Request, Response } from "express";

const TaskController = {
  addTask: asyncHandler(async (req: Request, res: Response) => {
    const { task } = req.body;

    const newTask = await TaskService.addTask(task);
    return res.status(201).json({
      success: true,
      message: "Task Added!",
      data: newTask,
    });
  }),
};

export default TaskController;
