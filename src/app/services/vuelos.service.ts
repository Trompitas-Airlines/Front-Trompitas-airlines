import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VuelosService {

  constructor(private http: HttpClient) { }

  public get(url:string){

    return this.http.get(url);


  }




  }







