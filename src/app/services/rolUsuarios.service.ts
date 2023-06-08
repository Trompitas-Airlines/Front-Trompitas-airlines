import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolUsuariosService {

  constructor(private http: HttpClient) { }

  urlRolUsuario: string = "http://localhost:8080/rolUsuario"

  public getRolUsuarioById(id: number): Observable<any> {

    return this.http.get(this.urlRolUsuario + "/obtenerRolUsuario/" + id);

  }

  public getRolUsuarios(): Observable<any> {
    return this.http.get(this.urlRolUsuario + "/obtenerRolUsuarios");
  }


  public getRolUsuariosActivo(): Observable<any> {
    return this.http.get(this.urlRolUsuario + "/obtenerRolUsuariosActivos");
  }

  public postRolUsuario(rolUsuario: any): Observable<any> | null {
    try {
      return this.http.post(this.urlRolUsuario + "/guardarRolUsuario", rolUsuario);
    } catch (err) {
      return null;
    }
  }

  public putRolUsuario(id: number): Observable<any> {
    return this.http.put(this.urlRolUsuario + "/actualizarRolUsuario/" + id, null);
  }
}