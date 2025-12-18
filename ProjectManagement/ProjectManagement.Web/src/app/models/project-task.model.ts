export interface ProjectTask {
  id: number;
  title: string;
  description: string;
  status: 'Todo' | 'InProgress' | 'Done';
  projectId: number;
  dueDate: Date;
}

export enum ProjectTaskStatus {
  Todo = 0,
  InProgress = 1,
  Done = 2,
}

export const ProjectTaskStatusMapping: Record<ProjectTaskStatus, string> = {
  [ProjectTaskStatus.Todo]: "To Do",
  [ProjectTaskStatus.InProgress]: "In Progress",
  [ProjectTaskStatus.Done]: "Done",
};