import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MainComponent} from "./main.component";
import {routing} from "./app.routes";
import {ListShowComponent} from "./components/list-show.component";
import {ListRedirectorComponent} from "./components/list-redirector.component";
import {Angular2BlazeTemplateModule} from "angular2-blaze-template";
import {JoinComponent} from "./components/join.component";
import {SigninComponent} from "./components/signin.component";
import {FormsModule} from "@angular/forms";

@NgModule({
    // Components, Pipes, Directive
    declarations: [
        MainComponent,
        ListShowComponent,
        ListRedirectorComponent,
        JoinComponent,
        SigninComponent
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
        Angular2BlazeTemplateModule,
        FormsModule
    ],
    // Main Component
    bootstrap: [MainComponent]
})
export class AppModule {
}