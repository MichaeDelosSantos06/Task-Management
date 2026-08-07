import TaskForm from "./TaskForm";

type EditModalProps = {
  onClose: () => void;
  onSuccess: () => Promise<void> | void;
  initialTask: string;
  taskId: number;
  onMutate: (data: { task: string }, id?: number) => Promise<void>;
};

const EditModal = ({
  onClose,
  onSuccess,
  initialTask,
  taskId,
  onMutate,
}: EditModalProps) => {
  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Edit task</h2>
        </div>

        <TaskForm
          onSuccess={onSuccess}
          onCancel={onClose}
          initialTask={initialTask}
          taskId={taskId}
          onMutate={onMutate}
        />
      </div>
    </div>
  );
};

export default EditModal;
