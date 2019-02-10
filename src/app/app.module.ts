import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { DemoPageComponent } from './containers/demo-page/demo-page.component';
import { ConferencePageComponent } from './containers/conference-page/conference-page.component';
import { ParticipantVideoComponent } from './components/participant-video/participant-video.component';
import {
  TokenInterceptorProvider,
  ErrorInterceptorProvider
} from './app.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    DemoPageComponent,
    ConferencePageComponent,
    ParticipantVideoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFontAwesomeModule
  ],
  providers: [TokenInterceptorProvider, ErrorInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule {}
