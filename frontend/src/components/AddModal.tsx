import TaskForm from "./TaskForm";

type AddModalProps = {
  onClose: () => void;
  onSuccess: () => Promise<void> | void;
  onMutate: (data: { task: string }) => Promise<void>;
};

const AddModal = ({ onClose, onSuccess, onMutate }: AddModalProps) => {
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
          <h2 className="text-lg font-semibold text-gray-900">Create task</h2>
        </div>

        <TaskForm
          onSuccess={onSuccess}
          onCancel={onClose}
          onMutate={onMutate}
        />
      </div>
    </div>
  );
};

export default AddModal;
