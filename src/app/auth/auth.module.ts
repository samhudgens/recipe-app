import { NgModule } from "@angular/core";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AuthRoutingModule } from "./auth-routing.module";

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent
  ],
  imports: [
    ReactiveFormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule {}
