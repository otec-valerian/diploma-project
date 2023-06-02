import {NgModule} from "@angular/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
    exports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule, MatMenuModule, MatSelectModule]
})
export class AngularMaterialModule {
}
