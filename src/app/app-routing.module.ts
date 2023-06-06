import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MenuUsuarioComponent } from './components/menu-usuario/menu-usuario.component';
import { LoginUsuarioComponent } from './components/login-usuario/login-usuario.component';


const routes: Routes = [
{path:'', redirectTo: 'home', pathMatch: 'full'},
{path:'home', component: HomeComponent},
{path:'login', component: LoginComponent},
{path: 'home', redirectTo: 'home', pathMatch: 'full'},
{path:'dashboard-admin', component:DashboardAdminComponent},
{path:'admin-boton', component: LoginComponent},
{path:'menu-usuario', component: MenuUsuarioComponent},
{path:'siguiente-boton', component: MenuUsuarioComponent},
{path: 'dashboard-boton', component: DashboardAdminComponent},
{path: 'login-usuario', component: LoginUsuarioComponent},
{path: 'boton-loginUsario', component: MenuUsuarioComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
