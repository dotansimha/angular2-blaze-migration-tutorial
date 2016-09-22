import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListShowComponent} from "./components/list-show.component";
import {ListRedirectorComponent} from "./components/list-redirector.component";

const appRoutes: Routes = [
    {path: '', component: ListRedirectorComponent},
    {path: 'lists/:_id', component: ListShowComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
