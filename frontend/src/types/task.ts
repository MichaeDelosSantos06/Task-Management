export type Task = {
  id: number;
  task: string;
  status?: string;
  isActive?: boolean;
  completedAt?: Date | null;
};

export type TaskPayload = {
  task: string;
  isActive?: boolean;
  completedAt?: Date | null;
};
