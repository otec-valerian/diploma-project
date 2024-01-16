import {NgModule} from "@angular/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
    exports: [MatIconModule, MatButtonToggleModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule, MatMenuModule, MatSelectModule]
})
export class AngularMaterialModule {
}
