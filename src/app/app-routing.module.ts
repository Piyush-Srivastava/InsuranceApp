import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
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
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
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
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: '',
    redirectTo: '/policies',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/policies',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
