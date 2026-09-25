import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Bookingservice {
  private readonly apiUrl:string =environment.apiUrl;
  private readonly httpClient=inject(HttpClient);
  sendbookingdata(userdata:object ):Observable<any>{
    const accessToken = localStorage.getItem('userToken');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${accessToken}`,
  });

    return this.httpClient.post<any>(this.apiUrl+'/rooms/confirm',userdata, { headers });
  }
  getbookingdata(id: string): Observable<any> {
    const accessToken = localStorage.getItem('userToken');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${accessToken}`,
  });

  return this.httpClient.get<any>(this.apiUrl + '/rooms/confirm-stripe/'+id,{ headers });

}
}
