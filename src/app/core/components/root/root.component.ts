import {ChangeDetectionStrategy, Component} from "@angular/core";
import {BaseFacade} from "@core/state";
import {Observable} from "rxjs";
import {User} from "@core/api/authentication";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./root.component.scss'],
    templateUrl: './root.component.html',
})
export class RootComponent {
    public user$: Observable<User> = this.baseFacade.user$ as Observable<User>;

    constructor(private baseFacade: BaseFacade) {
    }

    public onSignOutClick(): void {
        this.baseFacade.dispatchSignOut();
    }
}
