import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private readonly apiUrl = environment.apiUrl + 'upload';

  constructor(private http: HttpClient) {
  }

  upload(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData, {reportProgress: true, observe: 'events'});
  }
}
