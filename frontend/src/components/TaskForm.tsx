import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import type { TaskPayload } from "../types/task";

type TaskFormValues = {
  task: string;
};

type TaskFormProps = {
  onSuccess: () => Promise<void> | void;
  onCancel: () => void;
  initialTask?: string;
  taskId?: number;
  onMutate: (data: TaskPayload, taskId?: number) => Promise<void>;
};

const TaskForm = ({
  onSuccess,
  onCancel,
  initialTask = "",
  taskId,
  onMutate,
}: TaskFormProps) => {
  const { register, handleSubmit, reset } = useForm<TaskFormValues>({
    defaultValues: { task: initialTask },
  });

  useEffect(() => {
    reset({ task: initialTask });
  }, [initialTask, reset]);

  const onSubmit = async (data: TaskFormValues) => {
    try {
      await onMutate({ task: data.task }, taskId);
      await onSuccess();
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="desc"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <Input
          id="desc"
          type="text"
          placeholder="Input your task ..."
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          {...register("task", { required: true })}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          {typeof taskId === "number" ? "Save" : "Add"}
        </Button>
        <Button
          type="button"
          onClick={onCancel}
          className="rounded border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
