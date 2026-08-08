import { TaskService } from "../services/task.service";
import type { TaskPayload } from "../types/task";

// Optional fields for task updates. `completedAt` is used by the checkbox toggle,
// and `task` is used by the edit form.
type UpdateTaskPayload = {
  task?: string;
  completedAt?: Date | null;
  isActive?: boolean;
};

// Hook contract for task mutation actions.
type UseTaskActions = () => {
  addTask: (data: TaskPayload) => Promise<void>;
  updateTask: (id: number, data: UpdateTaskPayload) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
};

const useTaskActions: UseTaskActions = () => {
  // Wrap API calls so components don't import TaskService directly.
  // This layer makes the action intent explicit.
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
