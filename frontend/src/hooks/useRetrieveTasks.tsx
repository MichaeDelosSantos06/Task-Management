import { TaskService } from "../services/task.service";
import { useEffect, useState } from "react";
import type { Task } from "../types/task";

const useRetrieveTasks = () => {
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState<Task[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const getTasks = async () => {
    try {
      const result = await TaskService.retrieveTask();

      // Normalization
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const raw: any[] = result.data || result || [];

      // Map backend task records into the frontend Task shape.
      // - If isActive is false → "Inactive"
      // - Else if completedAt exists → "Completed"
      // - Else → "Active"
      const mapped: Task[] = raw.map((r) => ({
        id: r.id,
        task: r.task,
        isActive: r.isActive,
        completedAt: r.completedAt ? new Date(r.completedAt) : null,
        status:
          r.isActive === false
            ? "Inactive"
            : r.completedAt
              ? "Completed"
              : "Active",
      }));

      setTask(mapped);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
