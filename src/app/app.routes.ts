import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Home } from './layout/home/home';
import { About } from './layout/about/about';
import { Services } from './layout/services/services';
import { Contact } from './layout/contact/contact';
import { Dashboard } from './dashboard/dashboard';
import { AboutAdmin } from './dashboard/pages/about.admin/about.admin';
import { ServicesAdmin } from './dashboard/pages/services.admin/services.admin';
import { ProjectsAdmin } from './dashboard/pages/projects.admin/projects.admin';
import { NotFound } from './not-found/not-found';
import { Projects } from './layout/projects/projects';
import { ContactAdmin } from './dashboard/pages/contact.admin/contact.admin';

export const routes: Routes = [

    {path:'', component:Layout, children:[
        {path: '', redirectTo: 'home', pathMatch: 'full'},
        {path:'home', component:Home},
        {path:'about', component:About},
        {path:'projects', component:Projects},
        {path:'services', component:Services},
        {path:'contact', component:Contact},
    ]},
    { path:'dashboard', component:Dashboard, children: [
        { path: '', redirectTo: 'about', pathMatch: 'full' },
        { path: 'about', component: AboutAdmin },
        { path: 'services', component: ServicesAdmin },
        { path: 'projects', component: ProjectsAdmin },
        { path: 'contact', component: ContactAdmin },
    ]},
    {path:'**',component:NotFound}
];
