import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArepuertosService {

  constructor(private http:HttpClient) { }


  urlAeropueto:string = "http://localhost:8080/aeropuerto"

  public getAeropuertoById(id:number):Observable<any>{

    return this.http.get(this.urlAeropueto + "/obtenerAeropuerto/" + id);


  }
}
