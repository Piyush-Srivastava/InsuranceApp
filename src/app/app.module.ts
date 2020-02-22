import { AuthGuard } from './auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PoliciesComponent } from './policies/policies.component';
import { SpecialEventsComponent } from './special-events/special-events.component';
import { AuthService } from './services/auth.service';
import { EventService } from './services/event.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { PaymentComponent } from './payment/payment.component';
import { ContactComponent } from './contact/contact.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { DomiciliaryComponent } from './domiciliary/domiciliary.component';
import { HospitalizationComponent } from './hospitalization/hospitalization.component';
import { ClaimTrackerComponent } from './claim-tracker/claim-tracker.component';
import { ProfileComponent } from './profile/profile.component';


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
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AuthService, AuthGuard, EventService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
