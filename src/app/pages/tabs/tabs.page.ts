import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet
} from '@ionic/angular/standalone';
import { ComponentCustomComponent } from '../../components/component-custom/component-custom.component';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { home, addCircle, checkmarkDoneCircle } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    ComponentCustomComponent,
    RouterLink
  ]
})
export class TabsPage implements OnInit {
  AppPages = [
    { title: 'Tareas', tab: 'task', url: '/tabs/task', icon: 'home' },
    { title: 'Agregar', tab: 'create-task', url: '/tabs/create-task', icon: 'add-circle' },
    { title: 'Completadas', tab: 'completed-tasks', url: '/tabs/completed-tasks', icon: 'checkmark-done-circle' }
  ];

  constructor() {
    addIcons({ home, addCircle, checkmarkDoneCircle });
  }

  ngOnInit() {}
}
