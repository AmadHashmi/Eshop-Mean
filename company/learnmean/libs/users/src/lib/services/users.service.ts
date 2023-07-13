import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { User } from "../models/users";
import { environment } from "@env/environment";
import * as countriesLib from "i18n-iso-countries";
import { UsersFacade } from "../state/users.facade";
declare const require;
@Injectable({
  providedIn: "root",
})
export class UsersService {
  apiUrlUsers = `${environment.apiURL}users`;
  constructor(private http: HttpClient, private usersFacade: UsersFacade) {
    countriesLib.registerLocale(require("i18n-iso-countries/langs/en.json"));
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrlUsers);
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrlUsers}/${userId}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrlUsers, user);
  }
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrlUsers}/${user.id}`, user);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrlUsers}/${userId}`);
  }
  getUsersCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiUrlUsers}/get/count`)
      .pipe(map((objectValue: any) => objectValue.userCount));
  }
  getCountries(): { id: string; name: string }[] {
    return Object.entries(
      countriesLib.getNames("en", { select: "official" })
    ).map((entry) => {
      return {
        id: entry[0],
        name: entry[1],
      };
    });
  }

  getCountry(countryKey: string): string {
    return countriesLib.getName(countryKey, "en");
  }

  initAppSession() {
    this.usersFacade.buildUserSession();
  }

  observeCurrentUser() {
    return this.usersFacade.currentUser$;
  }

  isCurrentUserAuth() {
    return this.usersFacade.isAuthenticated$;
  }
}
