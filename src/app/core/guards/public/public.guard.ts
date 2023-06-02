import {filter, map, Observable} from "rxjs";
import {Router, UrlTree} from "@angular/router";
import {BaseFacade} from "@core/state";
import {inject} from "@angular/core";
import {User} from "@core/api/authentication";

export const publicGuard = ():Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
    const baseFacade: BaseFacade = inject(BaseFacade);
    const router: Router = inject(Router);

    return baseFacade.user$.pipe(
        filter((user: User | null | undefined) => user !== undefined),
        map((user: User | null | undefined) => {
            console.log('IN PUBLIC GUARD', user)
            if (user) {
                router.navigateByUrl('/app/main');
                return false
            } else {
                return true;
            }
        })
    )
}
