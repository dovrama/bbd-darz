import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ListComponent } from "./main/list/list.component";
import { LandingComponent } from "./main/landing/landing.component";
import { GridComponent } from "./main/grid/grid.component";

import { PlantListComponent } from "./admin/plant-list/plant-list.component";
import { PlantCreateComponent } from "./admin/plant-create/plant-create.component";
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'list', component: ListComponent },
  { path: 'landing', component: LandingComponent },
  { path: 'grid', component: GridComponent },
  { path: 'plantcreate', component: PlantCreateComponent, canActivate: [AuthGuard] },
  { path: 'plantcreate/:plantId', component: PlantCreateComponent, canActivate: [AuthGuard] },
  { path: 'plantlist', component: PlantListComponent, canActivate: [AuthGuard] },
  { path: 'adminlogin', component: LoginComponent },
  { path: 'admincreateuser', component: SignupComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
