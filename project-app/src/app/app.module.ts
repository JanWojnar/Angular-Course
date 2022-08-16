import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core.module";
import {AuthModule} from "./auth/auth.module";
import {LoggingService} from "./logging.service";
import {shoppingListReducer} from "./shopping-list/store/shopping-list.reducer";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    AuthModule,
    CoreModule,
    SharedModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forFeature({shoppingList: shoppingListReducer})
  ],
  bootstrap: [AppComponent],
  providers: [LoggingService]
})
export class AppModule { }
