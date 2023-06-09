import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  constructor(private http: HttpClient) { }

  urlReserva: string = "http://localhost:8080/reserva"

  public getReservaById(id: number): Observable<any> {

    return this.http.get(this.urlReserva + "/obtenerReserva/" + id);

  }

  public getReservasActivas(): Observable<any> {
    return this.http.get(this.urlReserva + "/obtenerReservasActivas");
  }

  public getReservas(): Observable<any> {
    return this.http.get(this.urlReserva + "/obtenerReservas");
  }

  public postReserva(reserva: any): Observable<any> | null {
    try {
      return this.http.post(this.urlReserva + "/guardarReserva", reserva);
    } catch (err) {
      return null;
    }
  }

  public putReserva(reserva:any): Observable<any> {
    return this.http.put(this.urlReserva + "/actualizarReserva/" + reserva.idReserva, reserva);
  }
}
