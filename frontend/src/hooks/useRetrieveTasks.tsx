import { TaskService } from "../services/task.service";
import { useEffect, useState } from "react";
import type { Task } from "../types/task";

// Custom hook for retrieving and refreshing the task list.
// This keeps the page component simple by handling data loading,
// error state, and data mapping in one reusable place.
const useRetrieveTasks = () => {
  // `loading` tracks whether the initial fetch is still in progress.
  const [loading, setLoading] = useState(true);
  // `task` is the array of tasks returned from the backend.
  const [task, setTask] = useState<Task[]>([]);
  // `error` stores any fetch error to show an error state.
  const [error, setError] = useState<Error | null>(null);

  const getTasks = async () => {
    try {
      const result = await TaskService.retrieveTask();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const raw: any[] = result.data || result || [];

      // Map backend task records into the frontend Task shape.
      // The backend may still return `status` as a string, so we derive
      // `isActive` and `isCompleted` here for UI convenience.
      const mapped: Task[] = raw.map((r) => ({
        id: r.id,
        task: r.task,
        status:
          r.status ??
          (r.isCompleted
            ? "Completed"
            : r.isActive === false
              ? "Inactive"
              : "Active"),
        isActive: r.isActive ?? r.status === "Active",
        isCompleted: r.isCompleted ?? r.status === "Completed",
      }));

      setTask(mapped);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return {
    task,
    loading,
    error,
    // Expose `refetch` so calling components can reload the list after updates.
    refetch: getTasks,
  };
};

export default useRetrieveTasks;
