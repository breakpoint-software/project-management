export interface ProjectTask {
  id: number;
  title: string;
  description: string;
  status: 'Todo' | 'InProgress' | 'Done';
  projectId: number;
  dueDate: Date;
}
