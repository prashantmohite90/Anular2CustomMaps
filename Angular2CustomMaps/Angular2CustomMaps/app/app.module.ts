import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SeMapComponent } from './se-map.component'
import { AppComponent }  from './app.component';

@NgModule({
    imports: [BrowserModule ],
    declarations: [AppComponent, SeMapComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
