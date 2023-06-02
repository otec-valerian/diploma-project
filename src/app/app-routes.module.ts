import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import {publicGuard} from "@core/guards/public";
import {privateGuard} from "@core/guards/private";
import {RootComponent} from "@core/components/root";

const routes: Route[] = [
    {
        path: 'login',
        canActivate: [publicGuard],
        loadChildren: () => import('@login').then(m => m.LoginModule)
    },
    {
        path: 'app',
        canActivate: [privateGuard],
        component: RootComponent,
        children: [
            {
                path: 'main',
                loadChildren: () => import('@main').then(m => m.MainModule)
            },
        ]
    },
    {
        path: '',
        redirectTo: '/app/main',
        pathMatch: 'full'
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
})
export class AppRoutesModule {
}
