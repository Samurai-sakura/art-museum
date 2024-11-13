import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment.development";

@Injectable({
  providedIn: "root",
})
export class DetailsService {
  constructor(private httpClient: HttpClient) {}

  getData(pageId: string | null): Observable<any> {
    return this.httpClient.get(environment.apiUrl + `/${pageId}`);
  }
}
