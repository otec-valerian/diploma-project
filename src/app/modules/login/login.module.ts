import {NgModule} from "@angular/core";
import {LoginRoutingModule} from "./login-routing.module";
import {SharedModule} from "@shared";
import {ShellComponent} from "./pages";
import {SignInModalComponent, SignUpModalComponent} from "./ui";

@NgModule({
    declarations: [ShellComponent, SignInModalComponent, SignUpModalComponent],
    imports: [LoginRoutingModule, SharedModule],
})
export class LoginModule {
}
