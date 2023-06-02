import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import {ShellComponent} from "./pages";

const routes: Route[] = [
    {
        path: '',
        component: ShellComponent,
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class MainRoutingModule {
}
