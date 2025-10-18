import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'tabs', pathMatch: 'full' },
  {
    path: 'tabs',
    loadComponent: () => import('./pages/tabs/tabs.page').then(m => m.TabsPage),
    children: [
      {
        path: 'task',
        loadComponent: () => import('./pages/task/task.page').then(m => m.TaskPage)
      },
      {
        path: 'create-task',
        loadComponent: () => import('./pages/create-task/create-task.page').then(m => m.CreateTaskPage)
      },
      {
        path: 'completed-tasks',
        loadComponent: () => import('./pages/completed-tasks/completed-tasks.page').then(m => m.CompletedTasksPage)
      },
      { path: '', redirectTo: 'task', pathMatch: 'full' }
    ]
  },
  {
    path: 'credits',
    loadComponent: () =>
      import('./pages/credits/credits.page').then(m => m.CreditsPage)
  },
  { path: '**', redirectTo: 'tabs' },
  {
    path: 'credits',
    loadComponent: () => import('./pages/credits/credits.page').then( m => m.CreditsPage)
  },


];
