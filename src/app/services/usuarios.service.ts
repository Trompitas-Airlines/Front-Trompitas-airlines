import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  urlUsuario: string = "http://localhost:8080/usuario"

  public getUsuarioById(id: number): Observable<any> {

    return this.http.get(this.urlUsuario + "/obtenerUsuario/" + id);

  }

  public getUsuariosActivos(): Observable<any> {

    return this.http.get(this.urlUsuario + "/obtenerUsuariosActivos");

  }

  public getUsuarios(): Observable<any> {

    return this.http.get(this.urlUsuario + "/obtenerUsuarios");

  }

  public postUsuario(usuario: any): Observable<any> | null {
    try {
      return this.http.post(this.urlUsuario + "/guardarUsuario", usuario);
    } catch (err) {
      return null;
    }
  }

  public putUsuario(id: number): Observable<any> {
    return this.http.put(this.urlUsuario + "/actualizarUsuario/" + id, null);
  }
}