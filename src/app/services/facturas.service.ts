import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  constructor(private http:HttpClient) { }

  urlFactura:string = "http://localhost:8080/factura"

  public getFacturaById(id:number):Observable<any>{

    return this.http.get(this.urlFactura + "/obtenerFactura/" + id);

  }

  public getFacturas():Observable<any>{
    return this.http.get(this.urlFactura + "/obtenerFacturas");
  }

  public postFactura(factura:any):Observable<any>{
    return this.http.post(this.urlFactura + "/guardarFactura", factura);
  }

  public getFacturasActivas():Observable<any>{
    return this.http.get(this.urlFactura + "/obtenerFacturasActivas");
  }

  public putFactura(id: number):Observable<any>{
    return this.http.put(this.urlFactura + "/actualizarFactura/" + id, null);
  }
}