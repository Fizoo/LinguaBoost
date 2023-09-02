//angular
import {isDevMode, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

//Material
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSelectModule} from "@angular/material/select";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatButtonToggleModule} from "@angular/material/button-toggle";

//Component
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {ContentComponent} from './components/content/content.component';
import {MainComponent} from './components/main/main.component';
import {HomePageComponent} from './components/home-page/home-page.component';
import {SidebarComponent} from './components/content/sidebar/sidebar.component';
import {StatistComponent} from './components/statist/statist.component';
import {ListComponent} from './components/content/list/list.component';
import {ListThemesComponent} from './components/content/sidebar/list-themes/list-themes.component';
import {FilterPageComponent} from './components/content/filter-page/filter-page.component';
import {LessonComponent} from './page/lesson/lesson.component';
import {Lesson2Component} from './page/lesson2/lesson2.component';
import {Lesson3Component} from './page/lesson3/lesson3.component';
import {MenuComponent} from './components/header/menu/menu.component';
import {VerbsComponent} from './components/phrases/verbs/verbs.component';
import {VerbListComponent} from './components/phrases/verbs/verb-list/verb-list.component';
import {TrainerComponent} from './page/trainer/trainer.component';
import {PhrasesComponent} from './components/phrases/phrases.component';
import {SidebarPhraseComponent} from './components/phrases/sidebar-phrase/sidebar-phrase.component';
import {
  PhraseListSidebarComponent
} from './components/phrases/sidebar-phrase/phrase-list-sidebar/phrase-list-sidebar.component';
import {PhrasesTrainerComponent} from './components/phrases/phrases-trainer/phrases-trainer.component';
import {CombineTextComponent} from './components/phrases/phrases-trainer/combine-text/combine-text.component';
import {BookLayoutComponent} from './components/book/book-layout/book-layout.component';
import {BookSentenceComponent} from './components/book/book-layout/book-sentence/book-sentence.component';
import {InfoComponent} from './components/info/info.component';
import {AudioComponent} from './components/book/book-layout/audio/audio.component';
import {BookMainComponent} from './components/book/book-main/book-main.component';
import {LoadingSpinnerComponent} from './page/loading-spinner/loading-spinner.component';
import {ErrorMessageComponent} from './page/error-message/error-message.component';

//Pipe
import {FilterThemePipe} from './pipes/filter-theme.pipe';
import {FilterPipe} from './pipes/filter.pipe';
import {FilterBookPipe} from './pipes/filter-book.pipe';
import {SearchBookPipe} from './pipes/search-book.pipe';
import {FilterPhrasesPipe} from './pipes/filter-phrases.pipe';
import {FilterAllPipe} from './pipes/filter-all.pipe';

//directive
import {ProgressDirective} from './directives/progress.directive';
import {DynamicRouterLinkActiveDirective} from './directives/dynamic-router-link-active.directive';
import {HighlightBookDirective} from './directives/highlight-book.directive';
import {TranslaterDirective} from './directives/translater.directive';

//Firebase
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {environment} from '../environments/environment';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getDatabase, provideDatabase} from '@angular/fire/database';
import {AngularFireModule} from "@angular/fire/compat";

//NGRX
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from './store';
import {EffectsModule} from '@ngrx/effects';
import {AppEffects} from './app.effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';


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
    CombineTextComponent,
    BookLayoutComponent,
    BookSentenceComponent,
    TranslaterDirective,
    InfoComponent,
    AudioComponent,
    BookMainComponent,
    SearchBookPipe,
    HighlightBookDirective,
    FilterBookPipe,
    LoadingSpinnerComponent,
    ErrorMessageComponent,
    DynamicRouterLinkActiveDirective,
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
    MatSelectModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
