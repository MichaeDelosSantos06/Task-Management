import { Router } from "express";
import TaskController from "../controllers/task.controllers.js";
import { validate } from "../middlewares/validtor.js";
import { updateTaskSchema } from "../schema/task.schema.js";

const router = Router();

router.post("/task/add-task", TaskController.addTask);
router.get("/task/get-task", TaskController.retrieveTask);
router.patch(
  "/task/update-task/:id",
  validate(updateTaskSchema),
  TaskController.updateTask,
);
router.delete("/task/delete-task/:id", TaskController.deleteTask);

export default router;
