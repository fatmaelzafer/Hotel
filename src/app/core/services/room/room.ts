import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { room } from '../../../shared/models/room/room';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.developing';

@Injectable({
  providedIn: 'root',
})
export class Room {
  private readonly apiUrl:string =environment.apiUrl;

  constructor(private readonly http:HttpClient){

  }
  getroombyid(id:string|null):Observable<room>{
    return  this.http.get<room>(this.apiUrl+'/rooms/'+id);

  }
}
