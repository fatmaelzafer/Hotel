import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.developing';
import { room } from '../../../shared/models/room/room';


@Injectable({
  providedIn: 'root',
})
export class Rooms {
  /*private readonly httpClient=inject(HttpClient);
  getrooms():Observable<any>{
    return this.httpClient.get<any>('http://ec2-13-61-62-105.eu-north-1.compute.amazonaws.com/rooms/1')
  }*/
  private readonly apiUrl:string =environment.apiUrl;

  constructor(private readonly http:HttpClient){

  }
  getrooms(page:number=1):Observable<room[]>{
    return  this.http.get<room[]>(this.apiUrl+'/rooms/all');

  }


}
