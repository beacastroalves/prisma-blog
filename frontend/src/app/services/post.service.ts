import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../main";
import { Observable, map } from "rxjs";

@Injectable({ providedIn: 'root' })
export class PostService {

  private mBaseUrl = `${environment.apiUrl}/posts`;

  constructor(
    private http: HttpClient
  ) { }


  create(title: string, description: string): Observable<void> {
    return this.http.post(`${this.mBaseUrl}`, {
      title: title,
      description: description
    }).pipe(
      map(res => {
        console.log(res);
      })
    );
  }
}