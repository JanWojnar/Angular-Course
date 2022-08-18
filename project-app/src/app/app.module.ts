import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {StoreModule} from '@ngrx/store';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core.module";
import {AuthModule} from "./auth/auth.module";
import {LoggingService} from "./logging.service";
import {reducers} from "./shared/store/app-state";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    StoreModule.forRoot(reducers),
    AuthModule,
    CoreModule,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  bootstrap: [AppComponent],
  providers: [LoggingService]
})
export class AppModule {
}
