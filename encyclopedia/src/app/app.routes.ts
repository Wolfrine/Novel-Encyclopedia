import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) },
  { path: 'entries', loadComponent: () => import('./components/entries/entries.component').then(m => m.EntriesComponent) },
  { path: 'entries/new', loadComponent: () => import('./components/entry-form/entry-form.component').then(m => m.EntryFormComponent) },
  { path: 'entries/:id', loadComponent: () => import('./components/entry-detail/entry-detail.component').then(m => m.EntryDetailComponent) },
  { path: 'entries/:id/edit', loadComponent: () => import('./components/entry-form/entry-form.component').then(m => m.EntryFormComponent) },
];
