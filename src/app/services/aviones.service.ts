import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvionesService {

  constructor(private http: HttpClient) { }

  urlAvion: string = "http://localhost:8080/avion"

  public getAvionById(id: number): Observable<any> {

    return this.http.get(this.urlAvion + "/obtenerAvion/" + id);

  }

  public getAviones(): Observable<any> {
    return this.http.get(this.urlAvion + "/obtenerAviones");
  }

  public getAvionesActivos(): Observable<any> {
    return this.http.get(this.urlAvion + "/obtenerAvionesActivos");
  }

  public postAvion(avion: any): Observable<any> | null {
    try {
      return this.http.post(this.urlAvion + "/guardarAvion", avion);
    } catch (err) {
      return null;
    }
  }

  public putAvion(id: number): Observable<any> {
    return this.http.put(this.urlAvion + "/actualizarAvion/" + id, null);
  }

}