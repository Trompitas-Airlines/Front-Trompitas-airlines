import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VuelosService { 

  constructor(private http: HttpClient) { }

  urlVuelo:string = "http://localhost:8080/vuelo"

  public getVuelosActivos():Observable<any>{  

    return this.http.get(this.urlVuelo + "/obtenerVuelosActivos");

  }

  public getVuelos():Observable<any>{  

    return this.http.get(this.urlVuelo + "/obtenerVuelos");

  }

  public getVueloById(id:number):Observable<any>{  

    return this.http.get(this.urlVuelo + "/obtenerVuelo/" + id);

  }

  public postVuelo(vuelo:any):Observable<any>{  

    return this.http.post(this.urlVuelo + "/guardarVuelo" ,vuelo);

  }

  public putVuelo(id: number):Observable<any>{
    return this.http.put(this.urlVuelo + "/actualizarVuelo/" + id, null);
  }

  }







