import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { 
  IonApp, 
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonTitle,
  IonLabel,
  IonToolbar,
  IonContent,
  IonHeader, 
  IonRouterOutlet,
  IonList,        
  IonItem,        
  IonListHeader   
} from '@ionic/angular/standalone';

import { ComponentCustomComponent } from './components/component-custom/component-custom.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonApp,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    RouterLink,
    IonList,       
    IonItem,        
    IonListHeader,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ComponentCustomComponent
  ]
})
export class AppComponent {
  boleano: boolean = true;

  constructor() {}
}
