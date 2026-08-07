import { createBrowserRouter } from "react-router-dom";
import TaskPage from "../pages/TaskPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <TaskPage />,
  },
]);
