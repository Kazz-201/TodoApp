import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonList, IonInput, IonButton, IonSelect, IonSelectOption, IonButtons } from '@ionic/angular/standalone';
import { Tasks } from 'src/app/models/tasks';
import { TasksService } from 'src/app/services/tasks-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.page.html',
  styleUrls: ['./create-task.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonList, IonInput, IonButton, IonSelect, IonSelectOption, IonButtons, RouterLink]
})
export class CreateTaskPage implements OnInit {

  constructor(private service: TasksService) {}

  titleTask: string = '';
  descriptionTask: string = '';
  dueDateTask: string | null = null; // YYYY-MM-DD
  priorityTask: 'low' | 'medium' | 'high' = 'medium';
  categoryTask: string = '';
  categories: string[] = ['Personal', 'Trabajo', 'Estudios', 'Compras', 'Otro'];

  ngOnInit() {}

  async addTasksFunction() {
    if (this.titleTask.trim() !== "" && this.descriptionTask.trim() !== "") {
      const tasks = await this.service.getAllTasks();
      const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;

      const newTask: Tasks = {
        id: newId,
        name: this.titleTask,
        description: this.descriptionTask,
        completed: false,
        priority: this.priorityTask,
        dueDate: this.dueDateTask ? new Date(this.dueDateTask) : undefined,
        category: this.categoryTask || 'Otro'
      };

      await this.service.addTask(newTask);

      this.titleTask = '';
      this.descriptionTask = '';
      this.dueDateTask = null;
      this.priorityTask = 'medium';
      this.categoryTask = '';
    }
  }
}
