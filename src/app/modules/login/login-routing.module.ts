import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ShellComponent} from "./pages";

const routes: Routes = [
    {
        path: '',
        component: ShellComponent,
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class LoginRoutingModule {
}
