import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HeaderComponent} from './components/header/header.component';

import {AuthGuard} from "./auth.guard";
import {AdminLayoutComponent} from './shared/admin-layout/admin-layout.component';
import {DashboardSidebarComponent} from './components/dashboard/dashboard-sidebar/dashboard-sidebar.component';
import {DashboardContentComponent} from './components/dashboard/dashboard-content/dashboard-content.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {DSListComponent} from './components/dashboard/dashboard-sidebar/d-s-list/d-s-list.component';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {DNavComponent} from './components/dashboard/dashboard-content/d-nav/d-nav.component';
import {DCListComponent} from './components/dashboard/dashboard-content/d-c-list/d-c-list.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatTooltipModule} from "@angular/material/tooltip";
import { DashAsideListPipe } from './pipe/dash-aside-list.pipe';
import {MatSelectModule} from "@angular/material/select";
import { DashCListPipe } from './pipe/dash-c-list.pipe';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';


/*const routes:Routes = [
  {path: '',component:AdminLayoutComponent,children:[
      {path:'',redirectTo:'/admin/signIn',pathMatch:'full'},
      {path:'signIn',component:SignInComponent},
      {path:'signUp',component:SignUpComponent},
      {path:'dashboard',component:DashboardComponent},
    ]
  }
]*/
const routes: Routes = [
  {path: '', redirectTo: 'admin', pathMatch: 'full'},
  {
    path: '', component: AdminLayoutComponent, children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomeAdminComponent},
      {path: 'word/:id', component: DashboardComponent, canActivate: [AuthGuard]},
      {path: 'phrase/:id', component: DashboardComponent, canActivate: [AuthGuard]},
      {path: 'signIn', component: SignInComponent},
      {path: 'signUp', component: SignUpComponent},
    ]
  },
];


@NgModule({
  declarations: [
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    HeaderComponent,
    AdminLayoutComponent,
    DashboardSidebarComponent,
    DashboardContentComponent,
    DSListComponent,
    DNavComponent,
    DCListComponent,
    DashAsideListPipe,
    DashCListPipe,
    HomeAdminComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatTooltipModule,
    MatSelectModule,

  ],
  exports: [
    RouterModule
  ]
})
export class AdminModule {
}
