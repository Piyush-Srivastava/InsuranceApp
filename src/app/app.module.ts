import { AuthGuard } from './core/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ToastyModule } from 'ng2-toasty';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PoliciesComponent } from './policies/policies.component';
import { SpecialEventsComponent } from './features/special-events/special-events.component';
import { AuthService } from './core/auth.service';
import { PolicyService } from './services/policy.service';
import { TokenInterceptorService } from './core/token.interceptor';
import { PaymentComponent } from './features/payment/payment.component';
import { ContactComponent } from './contact/contact.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { DomiciliaryComponent } from './features/reimbursement/domiciliary/domiciliary.component';
import { HospitalizationComponent } from './features/reimbursement/hospitalization/hospitalization.component';
import { ClaimTrackerComponent } from './features/claim-tracker/claim-tracker.component';
import { ProfileComponent } from './profile/profile.component';
import { ErrorComponent } from './error/error.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PoliciesComponent,
    SpecialEventsComponent,
    PaymentComponent,
    ContactComponent,
    AboutUsComponent,
    DomiciliaryComponent,
    HospitalizationComponent,
    ClaimTrackerComponent,
    ProfileComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    ToastyModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AuthService, AuthGuard, PolicyService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
