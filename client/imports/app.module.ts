import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MainComponent} from "./main.component";
import {routing} from "./app.routes";
import {ListShowComponent} from "./components/list-show.component";

@NgModule({
    // Components, Pipes, Directive
    declarations: [
        MainComponent,
        ListShowComponent
    ],
    // Entry Components
    entryComponents: [
        MainComponent
    ],
    // Providers
    providers: [],
    // Modules
    imports: [
        BrowserModule,
        routing
    ],
    // Main Component
    bootstrap: [MainComponent]
})
export class AppModule {
}