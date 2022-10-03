import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class LoginService {

    constructor(private router: Router){}

    /**
     * Logout.
     */
    public logout() : void {
        sessionStorage.clear();
        this.router.navigate(['/auth/login']);
    }
}