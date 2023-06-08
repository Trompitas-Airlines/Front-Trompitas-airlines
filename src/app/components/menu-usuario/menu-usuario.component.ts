import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { combineLatest } from 'rxjs';
import { AeropuertosService } from 'src/app/services/arepuertos.service';
import { AsientosService } from 'src/app/services/asientos.service';
import { FacturasService } from 'src/app/services/facturas.service';
import { ReservasService } from 'src/app/services/reservas.service';
import { VuelosService } from 'src/app/services/vuelos.service';



@Component({
  selector: 'app-menu-usuario',
  templateUrl: './menu-usuario.component.html',
  styleUrls: ['./menu-usuario.component.css']
})



export class MenuUsuarioComponent {

  mostrarPrecios: boolean = false;
  error: boolean = false
  precio: number = 0
  vuelo: boolean = false



  aeropuertosOrigen: any[] = []
  aeropuertosDestino: any[] = []
  vuelos: Vuelo[] = []

  asientoSeleccionadoC: string = '';

  mostrarOcultar() {

    if (this.vuelo) {
      this.vuelo = false;

    } else {
      this.vuelo = true
    }
  }

  ngOnInit() {
    this.vueloServ.getVuelos().subscribe(vuelo => {
      this.vuelos = vuelo
      console.log(this.vuelos)

      for (let i = 0; i < this.vuelos.length; i++) {
        this.obtenerAeropuertoById(this.vuelos[i].idAeropuertoOrigen).then((n: any) => {
          this.aeropuertosOrigen.push(n)
        })

      }
      for (let i = 0; i < this.vuelos.length; i++) {
        this.obtenerAeropuertoById(this.vuelos[i].idAeropuertoDestino).then((n: any) => {
          this.aeropuertosDestino.push(n)
        }
        )
      }
    })
  }

  obtenerAeropuertoById(id: number): any {
    const nombre = ""
    return new Promise((resolve, reject) => { this.aeroServ.getAeropuertoById(id).subscribe(aeropueto => { resolve(aeropueto.ubicacion) }) })

  }
  asientosVIP: string[] = []
  asientosNormales: string[] = []
  asientosBasicos: string[] = []

  asientoSeleccionado: string = '';
  asientosSeleccionadosCheck: string[] = [];



  vuelosMostrar: Vuelo = {

    idVuelo: 0,
    idAvion: 0,
    origen: "",
    destino: "",
    horaSalida: "",
    horaLlegada: "",
    precioVip: 0,
    precioNormal: 0,
    precioBasico: 0,
    idAeropuertoOrigen: 0,
    idAeropuertoDestino: 0,

  }

  constructor(private fb: FormBuilder, private vueloServ: VuelosService, private aeroServ: AeropuertosService, private asiServ: AsientosService, private resServ: ReservasService, private facturaServ: FacturasService, private toastr: ToastrService) { }

  myForm: FormGroup = this.fb.group({

    idVuelo: [, [Validators.required]],
    idSilla: [, [Validators.required]],

  })

  validarSillas(): boolean {
    const nsillas = this.asientosVIP.length + this.asientosNormales.length + this.asientosBasicos.length
    console.log(nsillas + "abcd")
    if (nsillas === 1) return true
    return false

  }

  obtenerVuelo(): any {

    for (let i = 0; i < this.vuelos.length; i++) {
      if (this.vuelos[i].idVuelo == this.myForm.value["idVuelo"]) {
        return this.vuelos[i];
      }
    }
  }

  crearAsiento() {
    const vuelo = this.obtenerVuelo()

    let asiento = {
      idAsiento: 0,
      idTipoAsiento: 0,
      idAvion: 1,
      ubicacion: "",
      estado: "A"
    }

    console.log(vuelo)
    this.vuelosMostrar = vuelo
    this.precio = vuelo.precio

    console.log(asiento)
    this.asiServ.postAsiento(asiento)?.subscribe(
      res => {

        let reserva = {

          idVuelo: vuelo.idVuelo,
          idAsiento: res.idAsiento,
          idUsuario: 1,
          precioTotal: this.precio,
          estadoPago: "N",
          fecha: new Date(),
          estado: "A"
        }


        this.resServ.postReserva(reserva)?.subscribe(
          data => {
            console.log(data)
          },
          err => {
            this.toastr.error(err.error.mensaje, "Error")
          }

        )
        console.log(res)
        this.toastr.success('Asiento guardau', 'Éxito')
      },
      err => {
        this.toastr.error(err.error.mensaje, "Error")

      }
    )
  }

  enviar() {
    if (this.myForm.valid && this.validarSillas()) {
      this.error = false
      this.crearAsiento()
      this.mostrarOcultar()
    } else {

      this.error = true
    }
  }

  enviarAhora() {
    if (this.myForm.valid && this.validarSillas()) {
      this.error = false
      this.crearAsientoPago()
      this.mostrarOcultar()
    } else {
      this.error = true
    }
  }

  preciosAsientos() {
    if (this.myForm.valid && this.validarSillas()) {
      this.error = false
      this.mostrarPrecios = true
      this.crearAsientoPago()

    } else {
      this.error = true
    }
  }

  crearAsientoPago() {
    const vuelo = this.obtenerVuelo()

    let asiento = {
      idAsiento: 0,
      idTipoAsiento: 0,
      idAvion: 1,
      ubicacion: "",
      estado: "A"
    }
    console.log(vuelo)
    this.vuelosMostrar = vuelo
    this.precio = vuelo.precio

    if (this.asientosVIP.length != 0) {
      asiento.idTipoAsiento = 1
      asiento.ubicacion = this.asientosVIP[0]
      this.precio += vuelo.precioAsientoVip
    }

    if (this.asientosNormales.length != 0) {
      asiento.idTipoAsiento = 2
      asiento.ubicacion = this.asientosNormales[0]
      this.precio += vuelo.precioAsientoNormal

    }

    if (this.asientosBasicos.length != 0) {
      asiento.idTipoAsiento = 3
      asiento.ubicacion = this.asientosBasicos[0]
      this.precio += vuelo.precioAsientoBasico

    }

    this.asiServ.postAsiento(asiento)?.subscribe(
      res => {
        let reserva = {
          idVuelo: vuelo.idVuelo,
          idAsiento: res.idAsiento,
          idUsuario: 1,
          precioTotal: this.precio,
          estadoPago: "P",
          fecha: new Date(),
          estado: "A"
        }

        this.resServ.postReserva(reserva)?.subscribe(
          data => {
            let factura = {
              idReserva: data.idReserva,
              fecha: new Date(),
              estado: "A"
            }

            this.facturaServ.postFactura(factura)?.subscribe(fac => { console.log(fac) })

            console.log(data)
            this.toastr.success('Reserva guardau', 'Éxito')
          },
          err => {
            this.toastr.error(err.error.mensaje, "Error")
          }
        )

      },

      err => {
        this.toastr.error(err.error.mensaje, "Error")
      }
    );
  }


  sasientoPrimera(nAsiento: string) {
    this.asientosVIP.push(nAsiento)
    this.myForm.controls['idSilla'].setValue(nAsiento)

    this.asientoSeleccionado = nAsiento;

    this.asientoSeleccionadoC = nAsiento;
  }

  sasientoNormal(nAsiento: string) {
    this.asientosNormales.push(nAsiento)
    this.myForm.controls['idSilla'].setValue(nAsiento)

    this.asientoSeleccionado = nAsiento;

    this.asientoSeleccionadoC = nAsiento;

  }

  sasientoBasico(nAsiento: string) {
    this.asientosBasicos.push(nAsiento)
    this.myForm.controls['idSilla'].setValue(nAsiento)

    this.asientoSeleccionado = nAsiento;

    this.asientoSeleccionadoC = nAsiento;

  }
}

interface Vuelo {
  idVuelo: number;
  idAvion: number;
  origen: string;
  destino: string;
  horaSalida: string
  horaLlegada: string
  precioVip: number;
  precioNormal: number;
  precioBasico: number;
  idAeropuertoOrigen: number;
  idAeropuertoDestino: number;
  vuel_id?: number;
  precio?: 0;
  precioAsientoVip?: 0;
  precioAsientoNormal?: 0;
  precioAsientoBasico?: 0;


}





