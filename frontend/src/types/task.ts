export type Task = {
  id: number;
  task: string;
  // original backend status (kept for compatibility)
  status?: string;
  // derived frontend flags (may be undefined until mapped)
  isActive?: boolean;
  isCompleted?: boolean;
};

export type TaskPayload = {
  task: string;
};
