import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HeaderComponent} from './components/header/header.component';

import {AuthGuard} from "./auth.guard";
import {AdminLayoutComponent} from './shared/admin-layout/admin-layout.component';


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
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  { path: '', component: AdminLayoutComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'signIn', component: SignInComponent },
      { path: 'signUp', component: SignUpComponent },
    ]},
];


@NgModule({
  declarations: [
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    HeaderComponent,
    AdminLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,

  ],
  exports: [
    RouterModule
  ]
})
export class AdminModule {
}
