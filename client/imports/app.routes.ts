import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const appRoutes: Routes = [
    {path: 'lists/:_id', component: ListShowComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
