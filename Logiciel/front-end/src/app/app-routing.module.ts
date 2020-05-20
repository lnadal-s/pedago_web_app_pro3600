import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { RoadmapComponent } from './application/roadmap/roadmap.component';
import { SettingsComponent } from './application/settings/settings.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthComponent } from './auth/auth.component';
import { ProjetsComponent } from './application/projets/projets.component';
import { HomeComponent } from './application/home/home.component';

const routes: Routes = [
    {
        path: 'login',
        component: AuthComponent,
        canActivate: [LoginGuard]

    },
    {
        path: "projet/:id",
        component: ProjetsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'roadmap',
        component: RoadmapComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'register',
        component: AuthComponent,
        canActivate: [LoginGuard]
    },
    {

        path: 'settings',
        component: SettingsComponent,
        canActivate: [AuthGuard]
    },

    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    { 
        path: '',
        redirectTo: '/home',
        pathMatch: 'full' 
    },
    {
        path: '**',
        component: NotFoundComponent,
    }
];

/*--------------------------------------------------
    propriete: CanActivate;
    @auteur: Lorenzo NADAL SANTA;
CanActivate permet de verifier si l'utilisateur est
bien conforme sur les conditions decritent dans les
guards si ce n'est pas cas le router ne dirige pas
l'utilisateur vers la page demandee;
--------------------------------------------------*/

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
