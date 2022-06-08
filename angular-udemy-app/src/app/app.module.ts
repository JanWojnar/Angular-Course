import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ServerBarComponent } from "./components/servers/server/server-bar.component"
import { ServersComponent } from './components/servers/servers.component';
import { FormsModule } from "@angular/forms";
import { UsernameFieldComponent } from './components/username-field/username-field.component';
import { HttpClientModule } from '@angular/common/http';

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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
