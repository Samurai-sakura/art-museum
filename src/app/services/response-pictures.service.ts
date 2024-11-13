import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment.development";

@Injectable({
  providedIn: "root",
})
export class ResponseService {
  constructor(private httpClient: HttpClient) {}

  getData(): Observable<any> {
    return this.httpClient.get(environment.apiUrl);
  }
}
