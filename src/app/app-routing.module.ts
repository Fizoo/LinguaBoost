import {NgModule} from '@angular/core';
import {PreloadAllModules, Router, RouterModule, Routes} from '@angular/router';
import {MainComponent} from './components/main/main.component';
import {HomePageComponent} from "./components/home-page/home-page.component";
import {ContentComponent} from "./components/content/content.component";
import {AuthGuard} from "./admin/auth.guard";

const routes: Routes = [
  {path: '',component:MainComponent,canActivate:[AuthGuard],
    children:[
      {path: '', pathMatch: 'full', redirectTo: 'home'},
      {path: 'home', component: HomePageComponent},
      {path: 'theme/:id', component: ContentComponent},
     /* { path: '**', redirectTo: 'home' }*/
    ]},
  {path:'admin',
  loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy:PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
