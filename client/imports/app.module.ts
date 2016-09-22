import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MainComponent} from "./main.component";

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
        BrowserModule
    ],
    // Main Component
    bootstrap: [MainComponent]
})
export class AppModule {
}