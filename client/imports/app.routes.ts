import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListShowComponent} from "./components/list-show.component";
import {ListRedirectorComponent} from "./components/list-redirector.component";
import {JoinComponent} from "./components/join.component";
import {SigninComponent} from "./components/signin.component";

const appRoutes: Routes = [
    {path: '', component: ListRedirectorComponent},
    {path: 'lists/:_id', component: ListShowComponent},
    {path: 'join', component: JoinComponent},
    {path: 'signin', component: SigninComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
