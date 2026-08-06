import { Router } from "express";
import TaskController from "../controllers/task.controllers.js";
import { TaskSchema } from "../schema/task.schema.js";
import { validate } from "../middlewares/validtor.js";

const router = Router();

router.post("/task/add-task", validate(TaskSchema), TaskController.addTask);

export default router;
