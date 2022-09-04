import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/users";
import { environment } from "@env/environment";
@Injectable({
  providedIn: "root",
})
export class UsersService {
  apiUrlUsers = `${environment.apiURL}users`;
  constructor(private http: HttpClient) {}

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
}
