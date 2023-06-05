import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoASientosService {

  constructor(private http:HttpClient) { }

  urlTipoAsiento:string = "http://localhost:8080/tipoAsiento"

  public getTipoAsientoById(id:number):Observable<any>{

    return this.http.get(this.urlTipoAsiento + "/obtenerTipoAsiento/" + id);

  }

  public getTrayectosActivos():Observable<any>{  

    return this.http.get(this.urlTipoAsiento + "/obtenerTipoAsientosActivos");

  }

  public getTipoAsientos():Observable<any>{  

    return this.http.get(this.urlTipoAsiento + "/obtenerTipoAsientos");

  }

  public postTipoAsiento(tipoAsiento:any):Observable<any>{  

    return this.http.post(this.urlTipoAsiento + "/guardarTipoAsiento" ,tipoAsiento);

  }

  public putTipoAsiento(id: number):Observable<any>{
    return this.http.put(this.urlTipoAsiento + "/actualizarTipoAsiento/" + id, null);
  }

}