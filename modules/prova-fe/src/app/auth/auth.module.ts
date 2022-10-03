import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { BzButtonModule, BzCardModule, BzDatePickerModule, BzErrorModule, BzInputModule,
   BzLayoutModule, BzRadioModule } from '@micegroup/voila2-blazing-ng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing-module';
import { SignupComponent } from './signup/signup.component';

const COMPONENTS = [
  AuthComponent,
  LoginComponent,
  SignupComponent
]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    AuthRoutingModule,
    CommonModule,
    CommonModule,
    BzCardModule,
    BzLayoutModule,
    BzInputModule,
    BzButtonModule,
    BzErrorModule,
    BzDatePickerModule,
    BzRadioModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[AuthComponent]
})
export class AuthModule { }
