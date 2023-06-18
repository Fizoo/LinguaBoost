import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {MainComponent} from './components/main/main.component';
import {HomePageComponent} from "./components/home-page/home-page.component";
import {ContentComponent} from "./components/content/content.component";
import {AuthGuard} from "./admin/auth.guard";
import {Lesson2Component} from "./page/lesson2/lesson2.component";
import {Lesson3Component} from "./page/lesson3/lesson3.component";
import {LessonWriteByEngComponent} from "./page/lesson-write-by-eng/lesson-write-by-eng.component";
import {LessonTranslateToEngComponent} from "./page/lesson-translate-to-eng/lesson-translate-to-eng.component";
import {LessonTranslateToUaComponent} from "./page/lesson-translate-to-ua/lesson-translate-to-ua.component";
import {LessonCollectComponent} from "./page/lesson-collect/lesson-collect.component";
import {TrainerComponent} from "./page/trainer/trainer.component";
import {PhrasesComponent} from "./components/phrases/phrases.component";
import {PhrasesTrainerComponent} from "./components/phrases/phrases-trainer/phrases-trainer.component";

const routes: Routes = [
  {path: '',component:MainComponent,canActivate:[AuthGuard],
    children:[
      {path: '', pathMatch: 'full', redirectTo: 'home'},
      {path: 'home', component: HomePageComponent},
      {path: 'theme/:id', component: ContentComponent},
      {path:'phrases/:id',component:PhrasesComponent},
     /* { path: '**', redirectTo: 'home' }*/
    ]},
  {path:'phrases/:id/trainer/:id',component:PhrasesTrainerComponent},
  {path:'theme/:id/trainer/:id',component:TrainerComponent},
  {path:'theme/:id/lesson/:id',component:LessonWriteByEngComponent},
  {path:'theme/:id/translateEng/:id',component:LessonTranslateToEngComponent},
  {path:'theme/:id/translateUa/:id',component:LessonTranslateToUaComponent},
  {path:'theme/:id/collect/:id',component:LessonCollectComponent},
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
