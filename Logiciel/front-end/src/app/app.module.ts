import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { ChartsModule } from 'ng2-charts';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthService } from './services/auth.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { RoadmapComponent } from './application/roadmap/roadmap.component';
import { ProjetComponent } from './application/roadmap/projet/projet.component';
import { DataUserComponent } from './application/data-user/data-user.component';
import { SettingsComponent } from './application/settings/settings.component';
import { ProjetService } from './services/projet.service';
import { NbThemeModule,  NbSidebarModule, NbLayoutModule, NbDialogModule, NbButtonModule, NbCardModule, NbToggleModule, NbInputModule, NbBadgeModule, NbPopoverModule, NbIconModule, NbUserModule, NbTreeGridModule, NbTabsetModule} from '@nebular/theme';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthComponent } from './auth/auth.component';
import { ApplicationComponent } from './application/application.component';
import { ProjetsComponent } from './application/projets/projets.component';
import { HomeComponent } from './application/home/home.component';
import { TreeComponent } from './application/roadmap/tree/tree.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RoadmapComponent,
    ProjetComponent,
    DataUserComponent,
    SettingsComponent,
    NotFoundComponent,
    AuthComponent,
    ApplicationComponent,
    ProjetsComponent,
    HomeComponent,
    TreeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ChartsModule,
    
    HttpClientModule,
    Ng2SearchPipeModule,
    NbSidebarModule,
    NbTreeGridModule,
    NbLayoutModule,
    NbThemeModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbButtonModule,
    NbCardModule,
    NbBadgeModule,
    NbInputModule,
    NbIconModule,
    NbToggleModule,
    NbPopoverModule,
    NbUserModule,
    NbTabsetModule,
    NbDialogModule.forRoot(),
    AppRoutingModule, 
  ],
  providers: [AuthService, ProjetService, AuthGuard, LoginGuard, {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
