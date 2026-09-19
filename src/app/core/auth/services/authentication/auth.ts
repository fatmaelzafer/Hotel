import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.developing';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly apiUrl:string =environment.apiUrl;
  private readonly httpClient=inject(HttpClient);
  sendregisterdata(userdata:object ):Observable<any>{
    return this.httpClient.post<any>(this.apiUrl+'/auth/',userdata);
  }
}
