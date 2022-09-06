import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/users";
import { environment } from "@env/environment";
import { LocalStorageService } from "./local-storage.service";
import { Router } from "@angular/router";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  apiUrlUsers = `${environment.apiURL}users`;
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}
  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrlUsers}/login`, {
      email,
      password,
    });
  }

  logout() {
    this.localStorageService.removeToken();
    this.router.navigate(["/login"]);
  }

  // getUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(this.apiUrlUsers);
  // }

  // getUser(userId: string): Observable<User> {
  //   return this.http.get<User>(`${this.apiUrlUsers}/${userId}`);
  // }

  // createUser(user: User): Observable<User> {
  //   return this.http.post<User>(this.apiUrlUsers, user);
  // }
  // updateUser(user: User): Observable<User> {
  //   return this.http.put<User>(`${this.apiUrlUsers}/${user.id}`, user);
  // }

  // deleteUser(userId: string): Observable<any> {
  //   return this.http.delete<any>(`${this.apiUrlUsers}/${userId}`);
  // }
}
