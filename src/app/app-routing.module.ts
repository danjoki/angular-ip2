import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReposComponent } from './repos/repos.component';

const routes: Routes = [
  { path: 'user', component: UserDetailsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'repos', component: ReposComponent },
  { path: '**', component: NotFoundComponent },

  { path: '', redirectTo: '/user', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
