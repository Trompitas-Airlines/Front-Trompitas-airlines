import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AeropuertosService } from 'src/app/services/arepuertos.service';
import { AsientosService } from 'src/app/services/asientos.service';
import { FacturasService } from 'src/app/services/facturas.service';
import { ReservasService } from 'src/app/services/reservas.service';
import { VuelosService } from 'src/app/services/vuelos.service';

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

@Component({
  selector: 'app-menu-usuario',
  templateUrl: './menu-usuario.component.html',
  styleUrls: ['./menu-usuario.component.css']
})



export class MenuUsuarioComponent {

  asientosVipLista = [
    { activo: false, ubicacion: 'A1' }, { activo: false, ubicacion: 'A2' }, { activo: false, ubicacion: 'A3' }, { activo: false, ubicacion: 'A4' }, { activo: false, ubicacion: 'A5' },
    { activo: false, ubicacion: 'A6' }, { activo: false, ubicacion: 'A7' }, { activo: false, ubicacion: 'A8' }, { activo: false, ubicacion: 'A9' }, { activo: false, ubicacion: 'A10' },
    { activo: false, ubicacion: 'A11' }, { activo: false, ubicacion: 'A12' }, { activo: false, ubicacion: 'A13' }, { activo: false, ubicacion: 'A14' }, { activo: false, ubicacion: 'A15' },
    { activo: false, ubicacion: 'A16' }, { activo: false, ubicacion: 'A17' }, { activo: false, ubicacion: 'A18' }, { activo: false, ubicacion: 'A19' }, { activo: false, ubicacion: 'A20' },
  ]

  asientosNormalesLista = [
    { activo: false, ubicacion: 'B1' }, { activo: false, ubicacion: 'B2' }, { activo: false, ubicacion: 'B3' }, { activo: false, ubicacion: 'B4' }, { activo: false, ubicacion: 'B5' },
    { activo: false, ubicacion: 'B6' }, { activo: false, ubicacion: 'B7' }, { activo: false, ubicacion: 'B8' }, { activo: false, ubicacion: 'B9' }, { activo: false, ubicacion: 'B10' },
    { activo: false, ubicacion: 'B11' }, { activo: false, ubicacion: 'B12' }, { activo: false, ubicacion: 'B13' }, { activo: false, ubicacion: 'B14' }, { activo: false, ubicacion: 'B15' },
    { activo: false, ubicacion: 'B16' }, { activo: false, ubicacion: 'B17' }, { activo: false, ubicacion: 'B18' }, { activo: false, ubicacion: 'B19' }, { activo: false, ubicacion: 'B20' },
  ]


  asientosBasicosLista = [
    { activo: false, ubicacion: 'C1' }, { activo: false, ubicacion: 'C2' }, { activo: false, ubicacion: 'C3' }, { activo: false, ubicacion: 'C4' }, { activo: false, ubicacion: 'C5' },
    { activo: false, ubicacion: 'C6' }, { activo: false, ubicacion: 'C7' }, { activo: false, ubicacion: 'C8' }, { activo: false, ubicacion: 'C9' }, { activo: false, ubicacion: 'C10' },
    { activo: false, ubicacion: 'C11' }, { activo: false, ubicacion: 'C12' }, { activo: false, ubicacion: 'C13' }, { activo: false, ubicacion: 'C14' }, { activo: false, ubicacion: 'C15' },
    { activo: false, ubicacion: 'C16' }, { activo: false, ubicacion: 'C17' }, { activo: false, ubicacion: 'C18' }, { activo: false, ubicacion: 'C19' }, { activo: false, ubicacion: 'C20' },
  ]

  hola: boolean = true;

  mostrarPrecios: boolean = false;
  error: boolean = false
  precio: number = 0
  vuelo: boolean = false
  reserva: any;
  mostrarBotones: boolean = true;
  checkboxDisabled: boolean = false;

  aeropuertosOrigen: any[] = []
  aeropuertosDestino: any[] = []
  vuelos: Vuelo[] = []

  factura1: boolean = false
  factura2: boolean = false
  mensajePago: boolean = false

  asientoSeleccionadoC: string = '';
  seleccionadoVuelo: boolean = false

  vueloSeleccionadoData: any;

  constructor(private fb: FormBuilder, private vueloServ: VuelosService, private aeroServ: AeropuertosService, private asiServ: AsientosService, private resServ: ReservasService, private facturaServ: FacturasService, private toastr: ToastrService) { }

  ngOnInit() {

    this.vueloServ.getVuelos().subscribe(vuelo => {
      this.vuelos = vuelo

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


  obtenerVueloInfo(idVuelo: number) {

    this.vueloServ.getVueloById(idVuelo).subscribe(vuelo => {
      this.vueloSeleccionadoData = vuelo
    })
  }

  vueloSeleccionado() {
    if (this.myForm.value['idVuelo'] === null) {
      this.error = true
      return
    }
    this.error = false

    const idVuelo = this.myForm.value['idVuelo']
    this.obtenerVueloInfo(parseInt(idVuelo))

    let listaReservas: any[] = []

    this.resServ.getReservas().subscribe(res => {

      this.seleccionadoVuelo = true
      for (let i = 0; i < res.length; i++) {

        if (res[i].idVuelo === parseInt(idVuelo)) {
          listaReservas.push(res[i])
        }
      }
      this.obtenerUbicacionesSeleccionadas(listaReservas)

    })

  }

  obtenerUbicacionesSeleccionadas(reservas: any[]) {
    let ubicaciones: string[] = []

    this.asiServ.getAsientos().subscribe(asie => {

      for (let i = 0; i < asie.length; i++) {

        for (let k = 0; k < reservas.length; k++) {

          if (reservas[k].idAsiento === asie[i].idAsiento) {
            ubicaciones.push(asie[i].ubicacion)
          }

        }
      }
      this.separarAsientosTipo(ubicaciones)
    })
  }

  separarAsientosTipo(ubicaciones: any[]) {

    let ubicacionesLVIP: any[] = []
    let ubicacionesLNormal: any[] = []
    let ubicacionesLBasicas: any[] = []

    for (let i = 0; i < ubicaciones.length; i++) {
      if (ubicaciones[i][0] == "A") {
        ubicacionesLVIP.push(ubicaciones[i].substring(1))
      }
      else if (ubicaciones[i][0] == "B") {
        ubicacionesLNormal.push(ubicaciones[i].substring(1))
      }
      else if (ubicaciones[i][0] == "C") {
        ubicacionesLBasicas.push(ubicaciones[i].substring(1))
      }
    }
    this.bloquearTomados(ubicacionesLVIP, ubicacionesLNormal, ubicacionesLBasicas)
  }

  bloquearTomados(ubiVip: any[], ubiNor: any[], ubiBas: any[]) {

    for (let i = 0; i < ubiVip.length; i++) {
      this.asientosVipLista[parseInt(ubiVip[i]) - 1].activo = true
    }
    for (let i = 0; i < ubiNor.length; i++) {
      this.asientosNormalesLista[parseInt(ubiNor[i]) - 1].activo = true
    }
    for (let i = 0; i < ubiBas.length; i++) {
      this.asientosBasicosLista[parseInt(ubiBas[i]) - 1].activo = true
    }
  }

  obtenerAsientosSeleccionados() {
    this.vueloSeleccionado()
  }


  myForm: FormGroup = this.fb.group({

    idVuelo: [, [Validators.required]],
    idSilla: [, [Validators.required]],
  })

  mostrarOcultar() {

    if (this.vuelo) {
      this.vuelo = false;

    } else {
      this.vuelo = true
    }
  }

  actFactura() {
    let reserva = {
      idReserva: this.reserva.idReserva,
      idVuelo: this.reserva.idVuelo,
      idAsiento: this.reserva.idAsiento,
      idUsuario: 1,
      precioTotal: this.reserva.precioTotal,
      estadoPago: "P",
      fecha: this.reserva.fecha,
      estado: "A"
    }

    this.resServ.putReserva(reserva).subscribe(data => {
      this.mensajePago = true
    }, err => {
      this.toastr.error(err.error.mensaje, "Error")
    })
  }

  obtenerAeropuertoById(id: number): any {
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

  validarSillas(): boolean {
    const nsillas = this.asientosVIP.length + this.asientosNormales.length + this.asientosBasicos.length

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

    this.precio = 0
    const vuelo = this.obtenerVuelo()

    let asiento = {
      idAsiento: 0,
      idTipoAsiento: 0,
      ubicacion: "",
      precio: 0,
      estado: "A"
    }

    this.precio += vuelo.precio
    console.log(this.precio)


    if (this.asientosVIP.length != 0) {
      asiento.idTipoAsiento = 1
      asiento.ubicacion = this.asientosVIP[0]
      this.precio += vuelo.precioAsientoVip
    }

    else if (this.asientosNormales.length != 0) {
      asiento.idTipoAsiento = 2
      asiento.ubicacion = this.asientosNormales[0]
      this.precio += vuelo.precioAsientoNormal

    }

    else if (this.asientosBasicos.length != 0) {
      asiento.idTipoAsiento = 3
      asiento.ubicacion = this.asientosBasicos[0]
      this.precio += vuelo.precioAsientoBasico

    }
    this.vuelosMostrar = vuelo



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

            this.reserva = data
            this.mostrarBotones = false;

          },
          err => {
            this.toastr.error(err.error.mensaje, "Error")
          }
        )

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
      this.factura1 = false
      this.factura2 = true
      this.mostrarPrecios = false
    } else {

      this.error = true
    }
  }

  enviarAhora() {
    if (this.myForm.valid && this.validarSillas()) {

      this.error = false
      this.crearAsientoPago()
      this.mostrarOcultar()
      this.factura1 = true
      this.factura2 = false
      this.mostrarPrecios = false
    } else {
      this.error = true
    }
  }

  crearAsientoPago() {

    const vuelo = this.obtenerVuelo()
    let asiento = {
      idAsiento: 0,
      idTipoAsiento: 0,
      ubicacion: "",
      precio: 0,
      estado: "A"
    }

    this.vuelosMostrar = vuelo

    this.precio = vuelo.precio
    if (this.asientosVIP.length != 0) {
      asiento.idTipoAsiento = 1
      asiento.ubicacion = this.asientosVIP[0]
      this.precio += vuelo.precioAsientoVip
    }

    else if (this.asientosNormales.length != 0) {
      asiento.idTipoAsiento = 2
      asiento.ubicacion = this.asientosNormales[0]
      this.precio += vuelo.precioAsientoNormal
    }

    else if (this.asientosBasicos.length != 0) {
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

            this.mostrarBotones = false;
            this.reserva = reserva

            this.facturaServ.postFactura(factura)?.subscribe(fac => {

            })
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
    this.checkboxDisabled = true;
  }

  sasientoNormal(nAsiento: string) {

    this.asientosNormales.push(nAsiento)
    this.myForm.controls['idSilla'].setValue(nAsiento)
    this.asientoSeleccionado = nAsiento;
    this.asientoSeleccionadoC = nAsiento;
    this.checkboxDisabled = true;

  }

  sasientoBasico(nAsiento: string) {

    this.asientosBasicos.push(nAsiento)
    this.myForm.controls['idSilla'].setValue(nAsiento)
    this.asientoSeleccionado = nAsiento;
    this.asientoSeleccionadoC = nAsiento;
    this.checkboxDisabled = true;

  }
}

