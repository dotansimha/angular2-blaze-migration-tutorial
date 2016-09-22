import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MainComponent} from "./main.component";
import {routing} from "./app.routes";

@NgModule({
    // Components, Pipes, Directive
    declarations: [
        MainComponent
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