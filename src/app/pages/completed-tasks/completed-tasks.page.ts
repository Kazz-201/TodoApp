import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton, IonButtons } from '@ionic/angular/standalone';
import { Tasks } from 'src/app/models/tasks';
import { TasksService } from 'src/app/services/tasks-service';
import { ViewDidEnter } from '@ionic/angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.page.html',
  styleUrls: ['./completed-tasks.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonLabel, IonButton, IonButtons, RouterLink]
})
export class CompletedTasksPage implements ViewDidEnter {

  tasksCompleted: Tasks[] = [];

  constructor(private tasksService: TasksService) {}

  ionViewDidEnter(): void {
    this.loadTasksCompleted();
  }

  async loadTasksCompleted() {
    this.tasksCompleted = await this.tasksService.getCompletedTasks();
  }

}
