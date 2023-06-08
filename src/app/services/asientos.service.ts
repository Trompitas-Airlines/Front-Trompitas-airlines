import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsientosService {

  constructor(private http: HttpClient) { }

  urlAsiento: string = "http://localhost:8080/asiento"

  public getAsientoById(id: number): Observable<any> {

    return this.http.get(this.urlAsiento + "/obtenerAsiento/" + id);

  }

  public getAsientos(): Observable<any> {
    return this.http.get(this.urlAsiento + "/obtenerAsientos");
  }

  public getAsientosActivos(): Observable<any> {
    return this.http.get(this.urlAsiento + "/obtenerAsientosActivos");
  }

  public postAsiento(asiento: any): Observable<any> | null {
    try {
      return this.http.post(this.urlAsiento + "/guardarAsiento", asiento);
    } catch (err) {
      return null;
    }
  }

  public putAsiento(id: number): Observable<any> {
    return this.http.put(this.urlAsiento + "/actualizarAsiento/" + id, null);
  }
}
