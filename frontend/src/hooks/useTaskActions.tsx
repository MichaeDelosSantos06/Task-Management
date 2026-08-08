import { TaskService } from "../services/task.service";
import type { TaskPayload } from "../types/task";

type UpdateTaskPayload = {
  task?: string;
  completedAt?: Date | null;
  isActive?: boolean;
};

type UseTaskActions = () => {
  addTask: (data: TaskPayload) => Promise<void>;
  updateTask: (id: number, data: UpdateTaskPayload) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
};

const useTaskActions: UseTaskActions = () => {
  const addTask = async (data: TaskPayload) => {
    await TaskService.addTask(data);
  };

  const updateTask = async (id: number, data: UpdateTaskPayload) => {
    await TaskService.updateTask(id, data);
  };

  const deleteTask = async (id: number) => {
    await TaskService.deleteTask(id);
  };

  return { addTask, updateTask, deleteTask };
};

export default useTaskActions;
