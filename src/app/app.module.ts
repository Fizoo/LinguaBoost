import {isDevMode, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {ContentComponent} from './components/content/content.component';
import {MainComponent} from './components/main/main.component';
import {HomePageComponent} from './components/home-page/home-page.component';
import {SidebarComponent} from './components/content/sidebar/sidebar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatToolbarModule} from "@angular/material/toolbar";
import {StatistComponent} from './components/statist/statist.component';
import {ListComponent} from './components/content/list/list.component';
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";
import {ListThemesComponent} from './components/content/sidebar/list-themes/list-themes.component';
import {FilterPageComponent} from './components/content/filter-page/filter-page.component';
import {FilterPipe} from './pipes/filter.pipe';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {environment} from '../environments/environment';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getDatabase, provideDatabase} from '@angular/fire/database';
import {AngularFireModule} from "@angular/fire/compat";

import {HttpClientModule} from "@angular/common/http";
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from './store';
import {EffectsModule} from '@ngrx/effects';
import {AppEffects} from './app.effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {FilterThemePipe} from './pipes/filter-theme.pipe';
import {LessonComponent} from './page/lesson/lesson.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {Lesson2Component} from './page/lesson2/lesson2.component';
import {Lesson3Component} from './page/lesson3/lesson3.component';
import {LessonCollectComponent} from './page/lesson-collect/lesson-collect.component';
import {LessonTranslateToUaComponent} from './page/lesson-translate-to-ua/lesson-translate-to-ua.component';
import {LessonWriteByEngComponent} from './page/lesson-write-by-eng/lesson-write-by-eng.component';
import {LessonTranslateToEngComponent} from './page/lesson-translate-to-eng/lesson-translate-to-eng.component';
import {LessonWriteSentenceComponent} from './page/lesson-write-sentence/lesson-write-sentence.component';
import {ProgressDirective} from './directives/progress.directive';
import {MenuComponent} from './components/header/menu/menu.component';
import {VerbsComponent} from './components/phrases/verbs/verbs.component';
import {VerbListComponent} from './components/phrases/verbs/verb-list/verb-list.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {TrainerComponent} from './page/trainer/trainer.component';
import {PhrasesComponent} from './components/phrases/phrases.component';
import {SidebarPhraseComponent} from './components/phrases/sidebar-phrase/sidebar-phrase.component';
import {
  PhraseListSidebarComponent
} from './components/phrases/sidebar-phrase/phrase-list-sidebar/phrase-list-sidebar.component';
import {FilterPhrasesPipe} from './pipes/filter-phrases.pipe';
import { FilterAllPipe } from './pipes/filter-all.pipe';
import { PhrasesTrainerComponent } from './components/phrases/phrases-trainer/phrases-trainer.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    MainComponent,
    HomePageComponent,
    SidebarComponent,
    StatistComponent,
    ListComponent,
    ListThemesComponent,
    FilterPageComponent,
    FilterPipe,
    FilterThemePipe,
    LessonComponent,
    Lesson2Component,
    Lesson3Component,
    LessonCollectComponent,
    LessonTranslateToUaComponent,
    LessonWriteByEngComponent,
    LessonTranslateToEngComponent,
    LessonWriteSentenceComponent,
    ProgressDirective,
    MenuComponent,
    VerbsComponent,
    VerbListComponent,
    TrainerComponent,
    PhrasesComponent,
    SidebarPhraseComponent,
    PhraseListSidebarComponent,
    FilterPhrasesPipe,
    FilterAllPipe,
    PhrasesTrainerComponent,
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        MatToolbarModule,
        MatInputModule,
        FormsModule,
        MatListModule,
        MatMenuModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideDatabase(() => getDatabase()),
        AngularFireModule.initializeApp(environment.firebase),

        StoreModule.forRoot(reducers, {
            metaReducers
        }),
        EffectsModule.forRoot([AppEffects]),
        StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode()}),
        MatProgressBarModule,
        ReactiveFormsModule,
        MatButtonToggleModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
