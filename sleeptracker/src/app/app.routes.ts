import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'tabs',
    loadComponent: () => import('./tabs/tabs.page').then(m => m.TabsPage),
    children: [
      { path: 'home', loadComponent: () => import('./home/home.page').then(m => m.HomePage) },
      { path: 'history', loadComponent: () => import('./history/history.page').then(m => m.HistoryPage) },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
  { path: 'add-entry', loadComponent: () => import('./add-entry/add-entry.page').then(m => m.AddEntryPage)},
  { path: '', redirectTo: 'tabs', pathMatch: 'full' },
  {
    path: 'add-entry',
    loadComponent: () => import('./add-entry/add-entry.page').then( m => m.AddEntryPage)
  },
];
