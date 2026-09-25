import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { room } from '../../../shared/models/room/room';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class Room {
  private readonly apiUrl:string =environment.apiUrl;

  constructor(private readonly http:HttpClient){

  }
  getroombyid(id:string):Observable<room>{
    const headers = new HttpHeaders({
    'ngrok-skip-browser-warning': 'true',
    });
    return  this.http.get<room>(this.apiUrl+'/rooms/'+id,{headers});

  }
}
