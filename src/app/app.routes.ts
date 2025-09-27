import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Home } from './layout/home/home';
import { About } from './layout/about/about';
import { Services } from './layout/services/services';
import { Contact } from './layout/contact/contact';
import { Dashboard } from './dashboard/dashboard';
import { NotFound } from './not-found/not-found';
import { Projects } from './layout/projects/projects';

export const routes: Routes = [

    {path:'', component:Layout, children:[
        {path: '', redirectTo: 'home', pathMatch: 'full'},
        {path:'home', component:Home},
        {path:'about', component:About},
        {path:'projects', component:Projects},
        {path:'services', component:Services},
        {path:'contact', component:Contact},
    ]},
    { path:'dashboard', component:Dashboard},
    {path:'**',component:NotFound}
];
