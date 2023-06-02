import {NgModule} from "@angular/core";
import {StateModule} from "./state";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthenticationInterceptor} from "./interceptors/authentication";
import {RootComponent} from "@core/components/root";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

@NgModule({
    declarations: [RootComponent],
    imports: [StateModule, CommonModule, RouterModule],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthenticationInterceptor,
            multi: true
        },
    ]
})
export class CoreModule {
}
