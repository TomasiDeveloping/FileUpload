import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {User} from "../interfaces/user.model";
import {UserToCreate} from "../interfaces/userToCreate.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl = environment.apiUrl + 'users/'

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  createUser(user: UserToCreate): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }
}
