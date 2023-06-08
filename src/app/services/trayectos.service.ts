import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrayectosService {

  constructor(private http: HttpClient) { }

  urlTrayecto: string = "http://localhost:8080/trayecto"

  public getTrayectoById(id: number): Observable<any> {

    return this.http.get(this.urlTrayecto + "/obtenerTrayecto/" + id);

  }

  public getTrayectosActivos(): Observable<any> {

    return this.http.get(this.urlTrayecto + "/obtenerTrayectosActivos");

  }

  public getTrayectos(): Observable<any> {

    return this.http.get(this.urlTrayecto + "/obtenerTrayectos");

  }

  public postTrayecto(trayecto: any): Observable<any> | null {
    try {
      return this.http.post(this.urlTrayecto + "/guardarTrayecto", trayecto);
    } catch (err) {
      return null;
    }
  }

  public putTrayecto(id: number): Observable<any> {
    return this.http.put(this.urlTrayecto + "/actualizarTrayecto/" + id, null);
  }
}