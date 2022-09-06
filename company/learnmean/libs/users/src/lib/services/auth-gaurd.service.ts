import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
  providedIn: "root",
})
export class AuthGaurd implements CanActivate {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const token = this.localStorageService.getToken();
    if (token) {
      const tokenDecode = JSON.parse(atob(token.split(".")[1]));
      console.log(tokenDecode && !this._tokenExpired(tokenDecode.exp));
      if (tokenDecode.isAdmin) return true;
    }
    this.router.navigate(["/login"]);
    return false;
  }

  private _tokenExpired(expiration): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
}
