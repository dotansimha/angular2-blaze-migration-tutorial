import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MainComponent} from "./main.component";
import {routing} from "./app.routes";
import {ListShowComponent} from "./components/list-show.component";
import {ListRedirectorComponent} from "./components/list-redirector.component";
import {JoinComponent} from "./components/join.component";
import {SigninComponent} from "./components/signin.component";
import {FormsModule} from "@angular/forms";
import {ListItemComponent} from "./components/list-item.component";

@NgModule({
    // Components, Pipes, Directive
    declarations: [
        MainComponent,
        ListShowComponent,
        ListRedirectorComponent,
        JoinComponent,
        SigninComponent,
        ListItemComponent
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
        FormsModule
    ],
    // Main Component
    bootstrap: [MainComponent]
})
export class AppModule {
}