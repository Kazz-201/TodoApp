import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel,
  IonTabs, IonTabBar, IonTabButton, IonInput, IonButton, IonCheckbox, IonIcon, IonBadge,
  IonModal, IonSelect, IonSelectOption, IonButtons
} from '@ionic/angular/standalone';
import { ViewDidEnter } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Tasks } from 'src/app/models/tasks';
import { TasksService } from 'src/app/services/tasks-service';
import { addIcons } from 'ionicons';
import { trash, checkmarkCircle, ellipseOutline, pencil } from 'ionicons/icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: 'task.page.html',
  styleUrls: ['task.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel,
    IonTabs, IonTabBar, IonTabButton, IonInput, IonButton, IonCheckbox, IonIcon, IonBadge,
    IonModal, IonSelect, IonSelectOption, IonButtons,
    RouterLink 
  ]
})
export class TaskPage implements ViewDidEnter {
  tasks: Tasks[] = [];

  // Filtros
  filterPriority: 'all' | 'low' | 'medium' | 'high' = 'all';
  filterCategory: 'all' | string = 'all';
  categories: string[] = [];

  // Estado del modal de edición
  isEditOpen = false;
  editingTaskId: number | null = null;
  editForm: {
    name: string;
    description: string;
    dueDate: string | null; // YYYY-MM-DD
    priority: 'low' | 'medium' | 'high';
    category: string;
  } = { name: '', description: '', dueDate: null, priority: 'medium', category: '' };

  constructor(private tasksService: TasksService) {
    addIcons({ trash, checkmarkCircle, ellipseOutline, pencil });
  }

  async loadTasks() {
    this.tasks = await this.tasksService.getAllTasks();
    this.updateCategories();
  }

  // Lista filtrada para el template
  get filteredTasks(): Tasks[] {
    return this.tasks.filter(t =>
      (this.filterPriority === 'all' || t.priority === this.filterPriority) &&
      (this.filterCategory === 'all' || t.category === this.filterCategory)
    );
  }

  private updateCategories() {
    const set = new Set<string>();
    this.tasks.forEach(t => { if (t.category) set.add(t.category); });
    this.categories = Array.from(set);
  }

  ionViewDidEnter() {
    this.loadTasks();
  }

  async completeTask(taskId: number) {
    await this.tasksService.completeTask(taskId);
    await this.loadTasks();
  }

  async deleteTask(taskId: number) {
    await this.tasksService.deleteTask(taskId);
    await this.loadTasks();
  }

  openEdit(task: Tasks) {
    this.editingTaskId = task.id;
    this.editForm.name = task.name;
    this.editForm.description = task.description ?? '';
    this.editForm.dueDate = task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 10) : null;
    this.editForm.priority = task.priority ?? 'medium';
    this.editForm.category = task.category ?? '';
    this.isEditOpen = true;
  }

  async saveEdit() {
    if (this.editingTaskId == null) return;
    await this.tasksService.updateTaskById(this.editingTaskId, {
      name: this.editForm.name,
      description: this.editForm.description || undefined,
      dueDate: this.editForm.dueDate ? new Date(this.editForm.dueDate) : undefined,
      priority: this.editForm.priority,
      category: this.editForm.category || undefined,
    });
    this.isEditOpen = false;
    this.editingTaskId = null;
    await this.loadTasks();
  }

  closeEdit() {
    this.isEditOpen = false;
    this.editingTaskId = null;
  }

  clearFilters() {
    this.filterPriority = 'all';
    this.filterCategory = 'all';
  }
}
