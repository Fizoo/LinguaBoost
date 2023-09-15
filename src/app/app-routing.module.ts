import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {MainComponent} from './components/main/main.component';
import {HomePageComponent} from "./components/home-page/home-page.component";
import {ContentComponent} from "./components/content/content.component";
import {AuthGuard} from "./admin/auth.guard";
import {Lesson2Component} from "./page/lesson2/lesson2.component";
import {Lesson3Component} from "./page/lesson3/lesson3.component";
import {TrainerComponent} from "./page/trainer/trainer.component";
import {PhrasesComponent} from "./components/phrases/phrases.component";
import {PhrasesTrainerComponent} from "./components/phrases/phrases-trainer/phrases-trainer.component";
import {BookLayoutComponent} from "./components/book/book-layout/book-layout.component";
import {BookMainComponent} from "./components/book/book-main/book-main.component";
import {LessonComponent} from "./page/lesson/lesson.component";
import {StatistComponent} from "./components/statist/statist.component";

const routes: Routes = [
  {path: '',component:MainComponent,canActivate:[AuthGuard],
    children:[
      {path: '', pathMatch: 'full', redirectTo: 'home'},
      {path: 'home', component: HomePageComponent},
      {path: 'theme/:id', component: ContentComponent},
      {path: 'phrases/:id',component:PhrasesComponent},
      {path: 'book', component: BookMainComponent},
      {path: 'stat', component: StatistComponent},
     /* { path: '**', redirectTo: 'home' }*/
    ]},
  {path: 'book/:id', component: BookLayoutComponent},

  {path:'phrases/:id/trainer/:id',component:PhrasesTrainerComponent},

  {path:'theme/:id/trainer/:id',component:TrainerComponent},
  {path:'theme/:id/lesson/:id',component:LessonComponent},
  {path:'theme/:id/translateEng/:id',component:LessonComponent},
  {path:'theme/:id/translateUa/:id',component:LessonComponent},
  {path:'theme/:id/lessons/result',component:Lesson2Component },
  {path:'theme/:id/:lessons/result/goal',component:Lesson3Component },

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
