import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ServerBarComponent } from "./server/server-bar.component"
import { ServersComponent } from './servers/servers.component';
import { FormsModule } from "@angular/forms";
import { UsernameFieldComponent } from './username-field/username-field.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ServerBarComponent,
    ServersComponent,
    UsernameFieldComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
