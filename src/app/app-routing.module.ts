import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { PoliciesComponent } from './policies/policies.component';
import { SpecialEventsComponent } from './special-events/special-events.component';
import { AuthGuard } from './auth.guard';
import { PaymentComponent } from './payment/payment.component';
import { ContactComponent } from './contact/contact.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { DomiciliaryComponent } from './domiciliary/domiciliary.component';
import { HospitalizationComponent } from './hospitalization/hospitalization.component';
import { ClaimTrackerComponent } from './claim-tracker/claim-tracker.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/policies',
    pathMatch: 'full'
  },
  {
    path: 'policies',
    component: PoliciesComponent
  },
  {
    path: 'domiciliary',
    component: DomiciliaryComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'claim-tracker',
    component: ClaimTrackerComponent
  },
  {
    path: 'hospitalization',
    component: HospitalizationComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'about-us',
    component: AboutUsComponent
  },
  {
    path: 'special',
    canActivate: [AuthGuard],
    component: SpecialEventsComponent
  },
  {
    path: 'payment',
    canActivate: [AuthGuard],
    component: PaymentComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
