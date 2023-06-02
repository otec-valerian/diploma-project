import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import {CoreModule} from "@core";
import {AppRoutesModule} from "./app-routes.module";
import {SharedModule} from "@shared";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        AppRoutesModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        CoreModule,
        SharedModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        // ServiceWorkerModule.register('ngsw-worker.js', {
        //     enabled: !isDevMode(),
        //     // Register the ServiceWorker as soon as the application is stable
        //     // or after 30 seconds (whichever comes first).
        //     registrationStrategy: 'registerWhenStable:30000'
        // }),
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
