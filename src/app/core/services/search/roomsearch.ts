import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.developing';
import { roomsearchresponse } from '../../../shared/models/search/search';
import { room } from '../../../shared/models/room/room';

@Injectable({
  providedIn: 'root',
})
export class Roomsearch {
  private readonly apiUrl:string =environment.apiUrl;

    constructor(private readonly http:HttpClient){

    }
    getrooms(page:number=1,out:string|null,checkIn:string|null,guests:number|null|string):Observable<roomsearchresponse<room[]>>{
      return  this.http.get<roomsearchresponse<room[]>>(this.apiUrl+'/rooms/?guests='+guests+'&page='+page+'&checkIn='+checkIn+'T16:10:16.486Z&checkout='+out+'T16:10:16.486Z');

    }
}
