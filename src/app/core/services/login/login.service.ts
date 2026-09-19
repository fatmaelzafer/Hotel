import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { flush } from '@angular/core/testing';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../../environments/environment.developing';
//import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
/*constructor(private readonly http:HttpClient){}
  apiUrl:string =environment.apiUrl;
  isloggedin$: BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  private platformid =inject(PLATFORM_ID);
  singup(data:Partial<any>):Observable<any>{
    // this.singup$=this.http.post(`${this.apiUrl}+/auth/signup`,data);
    // return this.singup$;
    return this.http.post<any>(`${this.apiUrl}/auth/signup`,data);
  }
  login(data:Partial<any>):Observable<any>{

    return this.http.post<any>(`${this.apiUrl}/auth/signin`,data);
  }
  islogin(){
    try{
      if(isPlatformBrowser(this.platformid) ){
        const token=localStorage.getItem('userToken')!;
        if(token){
          jwtDecode(token);
          this.isloggedin$.next(true);
          return ;
        }

      }
    }catch(error){
      this.isloggedin$.next(false);
    }
    this.isloggedin$.next(false);
  }*/
}
