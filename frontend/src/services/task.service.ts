import { api } from "../api/axios";

type TaskPayload = {
  task: string;
};

type UpdateTaskPayload = {
  task?: string;
  isCompleted?: boolean;
  isActive?: boolean;
};

// API client for task operations.
// Each method makes an HTTP request to the backend and returns the response data.
export const TaskService = {
  addTask: async (data: TaskPayload) => {
    const response = await api.post("/task/add-task", data);
    return response.data;
  },

  retrieveTask: async () => {
    const response = await api.get("/task/get-task");
    return response.data;
  },
  updateTask: async (id: number, data: UpdateTaskPayload) => {
    const response = await api.put(`/task/update-task/${id}`, data);
    return response.data;
  },

  deleteTask: async (id: number) => {
    const response = await api.delete(`/task/delete-task/${id}`);
    return response.data;
  },
};
