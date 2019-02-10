import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DemoPageComponent } from './containers/demo-page/demo-page.component';
import { ConferencePageComponent } from './containers/conference-page/conference-page.component';

const routes: Routes = [
  { path: 'demo', component: DemoPageComponent },
  { path: 'demo/:id', component: ConferencePageComponent },
  {
    path: '',
    redirectTo: '/demo',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
