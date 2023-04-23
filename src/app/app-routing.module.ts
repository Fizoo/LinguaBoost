import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {MainComponent} from './components/main/main.component';
import {HomePageComponent} from "./components/home-page/home-page.component";
import {ContentComponent} from "./components/content/content.component";

const routes: Routes = [
  {path: '',component:MainComponent,
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
