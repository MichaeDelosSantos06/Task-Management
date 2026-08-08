import useRetrieveTasks from "../hooks/useRetrieveTasks";
import useTaskActions from "../hooks/useTaskActions";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import Button from "../components/ui/Button";
import AddModal from "../components/AddModal";
import EditModal from "../components/EditModal";
import type { Task } from "../types/task";
import Input from "../components/ui/Input";

// Page component that renders the task dashboard.
// It uses hooks to fetch data, perform mutations, and manage local UI state.
const TaskPage = () => {
  // Load task data and the current status flags.
  const { task, loading, error, refetch } = useRetrieveTasks();
  // Provide actions for create/update/delete without exposing service details.
  const { addTask, updateTask, deleteTask } = useTaskActions();
  // Control whether the add-task modal is visible.
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  // If a task is being edited, store its values here.
  const [editingTask, setEditingTask] = useState<null | Task>(null);

  type Filter = "All" | "Active" | "Inactive" | "Completed";

  // Search term entered by the user.
  const [searchTerm, setSearchTerm] = useState("");
  // Selected filter for the list.
  const [filter, setFilter] = useState<Filter>("All");

  // Compute visible tasks based on search text and the current filter.
  // This keeps the UI reactive without mutating the original task array.
  const filteredTasks = (() => {
    const term = searchTerm.trim().toLowerCase();
    return task.filter((item) => {
      if (term && !item.task.toLowerCase().includes(term)) return false;
      if (filter === "All") return true;
      if (filter === "Active") return item.isActive === true;
      if (filter === "Inactive") return item.isActive === false;
      if (filter === "Completed") return !!item.completedAt;
      return true;
    });
  })();

  // After a new task is added, refresh the list and close the modal.
  const handleAddSuccess = async () => {
    await refetch();
    setIsAddModalOpen(false);
  };

  // After a task is edited, refresh the list and clear the editing state.
  const handleEditSuccess = async () => {
    await refetch();
    setEditingTask(null);
  };

  // Delete a task after user confirmation, then reload the data.
  const handleDelete = async (id: number) => {
    const ok = window.confirm("Delete this task?");
    if (!ok) return;
    try {
      await deleteTask(id);
      await refetch();
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle task completion: sets completedAt timestamp on backend
  const handleToggleCompleted = async (id: number, isCompleted: boolean) => {
    try {
      await updateTask(id, {
        completedAt: isCompleted ? new Date() : null,
      });
      await refetch();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-4">
      <h1 className="text-2xl font-semibold text-[45px] text-gray-900 text-center mb-15">
        Task Manager
      </h1>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Button opens the add-task modal. */}
        <Button
          type="button"
          className="rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          onClick={() => setIsAddModalOpen(true)}
        >
          Add task
        </Button>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="mt-2 sm:mt-0 sm:ml-4 flex items-center gap-2">
            {/* Search input filters tasks by text. */}
            <Input
              id="search"
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-xl border border-gray-300 px-3 py-2"
            />
            {/* Select control filters task status. */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as Filter)}
              className="rounded-xl border border-gray-300 bg-white px-1 py-2 text-sm "
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Data Mapping */}
      {/* Show loading, error, empty, and filtered states explicitly. */}
      {loading ? (
        <p className="text-sm text-gray-500">Loading tasks...</p>
      ) : error ? (
        <p className="text-sm text-red-600">Unable to load tasks.</p>
      ) : task.length === 0 ? (
        <p className="rounded border border-dashed border-gray-300 bg-gray-50 p-4 text-gray-600">
          No tasks yet. Use the button above to add one.
        </p>
      ) : filteredTasks.length === 0 ? (
        <p className="rounded border border-dashed border-gray-300 bg-gray-50 p-4 text-gray-600">
          No tasks match your search or filter.
        </p>
      ) : (
        <ul className="space-y-3 bg-gray-500/5 p-6 rounded-md">
          {filteredTasks.map((item) => (
            <li
              key={item.id}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-1 items-center gap-3">
                  <label className="flex items-center gap-3">
                    {/* Checkbox toggles completion by setting completedAt timestamp */}
                    <input
                      type="checkbox"
                      checked={!!item.completedAt}
                      onChange={(e) =>
                        handleToggleCompleted(item.id, e.target.checked)
                      }
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span
                      className={`text-sm font-medium ${
                        item.completedAt
                          ? "text-gray-500 line-through"
                          : "text-gray-900"
                      }`}
                    >
                      {item.task}
                    </span>
                  </label>

                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                    {item.status}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    aria-label="Edit task"
                    className="inline-flex h-9 w-9 items-center justify-center rounded border border-gray-300 text-gray-600 transition hover:bg-gray-50"
                    onClick={() =>
                      setEditingTask({
                        id: item.id,
                        task: item.task,
                        status: item.status,
                        isActive: item.isActive,
                      })
                    }
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    aria-label="Delete task"
                    className="inline-flex h-9 w-9 items-center justify-center rounded border border-red-300 text-red-600 transition hover:bg-red-50"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal trigger */}
      {/* Add-task modal appears when the user clicks the Add task button. */}
      {isAddModalOpen && (
        <AddModal
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={handleAddSuccess}
          onMutate={async (data) => addTask(data)}
        />
      )}

      {/* Edit-task modal appears when a task is selected for editing. */}
      {editingTask && (
        <EditModal
          onClose={() => setEditingTask(null)}
          onSuccess={handleEditSuccess}
          initialTask={editingTask.task}
          taskId={editingTask.id}
          isActive={editingTask.isActive}
          onMutate={async (data, id) => {
            if (typeof id === "number") return updateTask(id, data);
            return;
          }}
        />
      )}
    </div>
  );
};

export default TaskPage;
