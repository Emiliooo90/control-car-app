import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'appointments',
    loadComponent: () => import('./features/appointments/appointments.component').then(m => m.AppointmentsComponent)
  },
  {
    path: 'quotes',
    loadComponent: () => import('./features/quotes/quotes.component').then(m => m.QuotesComponent)
  },
  {
    path: 'quotes/create',
    loadComponent: () => import('./features/quotes/create-quote/create-quote.component').then(m => m.CreateQuoteComponent)
  },
  {
    path: 'products',
    loadComponent: () => import('./features/products/products.component').then(m => m.ProductsComponent)
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
