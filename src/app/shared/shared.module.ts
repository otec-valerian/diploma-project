import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {AngularMaterialModule} from "@shared/angular-material";
import {RouterOutlet} from "@angular/router";

@NgModule({
    imports: [RouterOutlet],
    exports: [AngularMaterialModule, CommonModule, ReactiveFormsModule, RouterOutlet]
})
export class SharedModule {
}
