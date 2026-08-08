import { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import { Power } from "lucide-react";
import Button from "./ui/Button";

type EditModalProps = {
  onClose: () => void;
  onSuccess: () => Promise<void> | void;
  initialTask: string;
  taskId: number;
  isActive?: boolean;
  onMutate: (
    data: { task: string; isActive?: boolean },
    id?: number
  ) => Promise<void>;
};

const EditModal = ({
  onClose,
  onSuccess,
  initialTask,
  taskId,
  isActive = true,
  onMutate,
}: EditModalProps) => {
  const [draftIsActive, setDraftIsActive] = useState(isActive);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDraftIsActive(isActive);
  }, [isActive]);

  const handleStatusToggle = () => {
    setDraftIsActive((current) => !current);
  };

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
          <Button
            type="button"
            onClick={handleStatusToggle}
            className={`inline-flex items-center gap-2 rounded px-3 py-1.5 text-sm font-medium transition ${
              draftIsActive
                ? "bg-green-100 text-green-700 hover:bg-green-200"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            title={
              draftIsActive ? "Click to mark inactive" : "Click to mark active"
            }
          >
            <Power className="h-4 w-4" />
            {draftIsActive ? "Active" : "Inactive"}
          </Button>
        </div>

        <TaskForm
          onSuccess={onSuccess}
          onCancel={onClose}
          initialTask={initialTask}
          taskId={taskId}
          isActive={draftIsActive}
          onMutate={onMutate}
        />
      </div>
    </div>
  );
};

export default EditModal;
