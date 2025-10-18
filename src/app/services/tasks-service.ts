import { Injectable } from '@angular/core';
import { Tasks } from '../models/tasks';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasks: Tasks[] = [];
  tasksCompleted: Tasks[] = [];
  private _storage: Storage | null = null;
  private storageReady: Promise<void>;

  constructor(private storage: Storage) {
    this.storageReady = this.initStorage();
  }

  private async initStorage(): Promise<void> {
    this._storage = await this.storage.create();
    await this.loadTasks();
  }

  private async loadTasks() {
    if (!this._storage) return;
    const storedTasks = await this._storage.get('tasks');
    const storedTasksCompleted = await this._storage.get('tasksCompleted');

    this.tasks = (storedTasks || []).map((t: any) => ({
      ...t,
      dueDate: t?.dueDate ? new Date(t.dueDate) : undefined,
    }));
    this.tasksCompleted = (storedTasksCompleted || []).map((t: any) => ({
      ...t,
      dueDate: t?.dueDate ? new Date(t.dueDate) : undefined,
    }));
  }

  async getAllTasks(): Promise<Tasks[]> { 
    await this.storageReady;
    return this.tasks;
  }

  async getCompletedTasks(): Promise<Tasks[]> {
    await this.storageReady;
    return this.tasksCompleted;
  }

  async addTask(newtask: Tasks): Promise<void> {
    await this.storageReady;
    console.log('Adding task:', newtask);
    console.log('Tasks before add:', this.tasks);
    
    this.tasks.push(newtask);
    
    console.log('Tasks after add:', this.tasks);
    console.log('Saving to storage...');
    
    await this._storage?.set('tasks', this.tasks);
    
    console.log('Task saved successfully');
  }

  async deleteTask(id: number): Promise<void> {
    await this.storageReady;
    console.log('Deleting task with id:', id);
    console.log('Tasks before delete:', this.tasks);
    
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.tasksCompleted = this.tasksCompleted.filter(t => t.id !== id);
    
    console.log('Tasks after delete:', this.tasks);
    
    await this._storage?.set('tasks', this.tasks);
    await this._storage?.set('tasksCompleted', this.tasksCompleted);
  }

  async completeTask(id: number): Promise<void> {
    await this.storageReady;
    const task = this.tasks.find(task => task.id === id);
    if (task) {
      task.completed = !task.completed;
      this.upgradeTasksCompleted(task);
      await this._storage?.set('tasks', this.tasks);
      await this._storage?.set('tasksCompleted', this.tasksCompleted);
    }
  }
  
  private upgradeTasksCompleted(task: Tasks): void {
    if (task.completed) {
      if (!this.tasksCompleted.find(t => t.id === task.id)) {
        this.tasksCompleted.push(task);
      }
    } else { 
      this.tasksCompleted = this.tasksCompleted.filter(t => t.id !== task.id);
    }
  }

  async addTaskToCompleted(tasksCompleted: Tasks): Promise<void> {
    await this.storageReady;
    if (tasksCompleted.completed && !this.tasksCompleted.find(t => t.id === tasksCompleted.id)) {
      this.tasksCompleted.push(tasksCompleted);
      await this._storage?.set('tasksCompleted', this.tasksCompleted);
    }
  }

  async updateTaskById(id: number, changes: Partial<Tasks>): Promise<void> {
    await this.storageReady;
    const idx = this.tasks.findIndex(t => t.id === id);
    if (idx === -1) return;

    const updated: Tasks = { ...this.tasks[idx], ...changes };
    this.tasks[idx] = updated;

    // Mantener lista de completadas consistente
    const doneIdx = this.tasksCompleted.findIndex(t => t.id === id);
    if (updated.completed) {
      if (doneIdx >= 0) this.tasksCompleted[doneIdx] = updated;
      else this.tasksCompleted.push(updated);
    } else {
      this.tasksCompleted = this.tasksCompleted.filter(t => t.id !== id);
    }

    await this._storage?.set('tasks', this.tasks);
    await this._storage?.set('tasksCompleted', this.tasksCompleted);
  }
}
