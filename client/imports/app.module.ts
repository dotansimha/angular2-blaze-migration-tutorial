import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MainComponent} from "./main.component";
import {routing} from "./app.routes";
import {ListShowComponent} from "./components/list-show.component";
import {ListRedirectorComponent} from "./components/list-redirector.component";
import {Angular2BlazeTemplateModule} from "angular2-blaze-template";

@NgModule({
    // Components, Pipes, Directive
    declarations: [
        MainComponent,
        ListShowComponent,
        ListRedirectorComponent
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
        routing,
        Angular2BlazeTemplateModule
    ],
    // Main Component
    bootstrap: [MainComponent]
})
export class AppModule {
}