import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VuelosService {

  constructor(private http: HttpClient) { }

  urlVuelos:string = "http://localhost:8080/vuelo"

  public getVuelos():Observable<any>{

    return this.http.get(this.urlVuelos + "/obtenerVuelosActivos");


  }




  }







