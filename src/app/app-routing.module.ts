import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PoliciesComponent } from './policies/policies.component';
import { ContactComponent } from './contact/contact.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ErrorComponent } from './error/error.component';

import { SpecialEventsComponent } from './features/special-events/special-events.component';
import { PaymentComponent } from './features/payment/payment.component';
import { DomiciliaryComponent } from './features/reimbursement/domiciliary/domiciliary.component';
import { HospitalizationComponent } from './features/reimbursement/hospitalization/hospitalization.component';
import { ClaimTrackerComponent } from './claim-tracker/claim-tracker.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'policies',
    component: PoliciesComponent
  },
  {
    path: 'domiciliary',
    canActivate: [AuthGuard],
    component: DomiciliaryComponent
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: ProfileComponent
  },
  {
    path: 'claim-tracker',
    canActivate: [AuthGuard],
    component: ClaimTrackerComponent
  },
  {
    path: 'hospitalization',
    canActivate: [AuthGuard],
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
