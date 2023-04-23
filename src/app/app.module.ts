import {NgModule, Provider} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {ContentComponent} from './components/content/content.component';
import {MainComponent} from './components/main/main.component';
import {HomePageComponent} from './components/home-page/home-page.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatToolbarModule} from "@angular/material/toolbar";
import {StatistComponent} from './components/statist/statist.component';
import {ListComponent} from './components/list/list.component';
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";
import {ListThemesComponent} from './components/sidebar/list-themes/list-themes.component';
import {TestComponent} from './components/test/test.component';
import {FilterPageComponent} from './components/filter-page/filter-page.component';
import {FilterPipe} from './pipes/filter.pipe';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {environment} from '../environments/environment';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getDatabase, provideDatabase} from '@angular/fire/database';
import {AngularFireModule} from "@angular/fire/compat";
import {AuthInterceptor} from "./services/auth.interceptor";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

const INTERCEPTORS_PROVIDERS:Provider = {
  provide:HTTP_INTERCEPTORS,
  multi:true,
  useClass:AuthInterceptor
}

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
    TestComponent,
    FilterPageComponent,
    FilterPipe
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
  ],
  providers: [INTERCEPTORS_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
