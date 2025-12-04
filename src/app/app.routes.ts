import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'services',
    loadComponent: () =>
      import('./pages/services/services.component').then((m) => m.ServicesComponent),
  },
  {
    path: 'pricing',
    loadComponent: () =>
      import('./pages/pricing/pricing.component').then((m) => m.PricingComponent),
  },
  {
    path: 'testimonials',
    loadComponent: () =>
      import('./pages/testimonials/testimonials.component').then((m) => m.TestimonialsComponent),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact.component').then((m) => m.ContactComponent),
  },
  {
    path: 'faq',
    loadComponent: () =>
      import('./pages/faq/faq.component').then((m) => m.FaqComponent),
  },
  {
    path: 'resources',
    loadComponent: () =>
      import('./pages/resources/resources.component').then((m) => m.ResourcesComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
