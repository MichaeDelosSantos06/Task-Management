import { Router } from "express";
import TaskController from "../controllers/task.controllers.js";

const router = Router();

router.post("/task/add-task", TaskController.addTask);
router.get("/task/get-task", TaskController.retrieveTask);
router.put("/task/update-task/:id", TaskController.updateTask);
router.delete("/task/delete-task/:id", TaskController.deleteTask);

export default router;
