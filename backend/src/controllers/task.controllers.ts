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

  retrieveTask: asyncHandler(async (req: Request, res: Response) => {
    const task = await TaskService.retrieveTask();
    return res.status(200).json({
      success: true,
      message: "Retrieve Successfully!",
      data: task,
    });
  }),

  updateTask: asyncHandler(async (req: Request, res: Response) => {
    const taskId = Number(req.params.id);
    const { task, isActive, completedAt } = req.body;

    const updatedTask = await TaskService.updateTask(taskId, {
      task,
      isActive,
      completedAt: completedAt ? new Date(completedAt) : completedAt,
    });
    return res.status(200).json({
      success: true,
      message: "Updated Successfully!",
      data: updatedTask,
    });
  }),

  deleteTask: asyncHandler(async (req: Request, res: Response) => {
    const taskId = Number(req.params.id);

    const deletedTask = await TaskService.deleteTask(taskId);
    return res.status(200).json({
      success: true,
      message: "Deleted Successfully",
      data: deletedTask,
    });
  }),
};

export default TaskController;
