export interface Tasks {
  id: number;
  name: string;
  description?: string;
  completed: boolean;
  dueDate?: Date;
  priority?: 'low' | 'medium' | 'high';
  category?: string;
}
