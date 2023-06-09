import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AeropuertosService {

  constructor(private http: HttpClient) { }

  urlAeropuerto: string = "http://localhost:8080/aeropuerto"

  public getAeropuertoById(id: number): Observable<any> {

    return this.http.get(this.urlAeropuerto + "/obtenerAeropuerto/" + id);

  }

  public getAeropuertos(): Observable<any> {
    return this.http.get(this.urlAeropuerto + "/obtenerAeropuertos");
  }

  public getAeropuertosActivos(): Observable<any> {
    return this.http.get(this.urlAeropuerto + "/obtenerAeropuertosActivos");
  }

  public postAeropuerto(aeropuerto: any): Observable<any> | null {
    try {
      return this.http.post(this.urlAeropuerto + "/guardarAeropuerto", aeropuerto);
    } catch (err) {
      return null;
    }
  }

  public putAeropuerto(id: number): Observable<any> {
    return this.http.put(this.urlAeropuerto + "/actualizarAeropuerto/" + id, null);
  }

}
