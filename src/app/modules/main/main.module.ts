import {NgModule} from "@angular/core";
import {SharedModule} from "@shared";
import {ShellComponent} from "./pages";
import {StateModule} from "./state";
import {FeedbackModalComponent} from "./ui";
import {NgOptimizedImage} from "@angular/common";
import {MainRoutingModule} from "./main-routing.module";

@NgModule({
    declarations: [ShellComponent, FeedbackModalComponent],
    imports: [MainRoutingModule, SharedModule, StateModule, NgOptimizedImage],
})
export class MainModule {
}
