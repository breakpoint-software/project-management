export interface Project {
  id: number;
  name: string;
  description: string;
  status: 'NotStarted' | 'InProgress' | 'Completed';
}
