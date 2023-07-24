import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./components/login/login.component";
import {canActivate, redirectUnauthorizedTo} from "@angular/fire/auth-guard";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard',
    loadChildren: () => import('./components/dashboard/dashboard.module').then(x => x.DashboardModule),
    ...canActivate(() => redirectUnauthorizedTo(['/login']))
    },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
