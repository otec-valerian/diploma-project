import {NgModule} from "@angular/core";
import {StoreModule} from "@ngrx/store";
import {reducer} from "./reducers";
import {EffectsModule} from "@ngrx/effects";
import {BaseEffects} from "./effects";
import {FEATURE_KEY} from "./state.constants";

@NgModule({
    imports: [StoreModule.forFeature(FEATURE_KEY, reducer), EffectsModule.forFeature([BaseEffects])],
})
export class StateModule {
}
