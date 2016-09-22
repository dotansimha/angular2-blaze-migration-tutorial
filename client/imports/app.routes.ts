import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListShowComponent} from "./components/list-show.component";

const appRoutes: Routes = [
    {path: 'lists/:_id', component: ListShowComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
