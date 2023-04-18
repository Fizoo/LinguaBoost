import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import {HomePageComponent} from "./components/home-page/home-page.component";

const routes: Routes = [
  {path: '',component:MainComponent,children:[
      {path: '', pathMatch: 'full', redirectTo: '/'},
      {path: '', component: HomePageComponent},
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
