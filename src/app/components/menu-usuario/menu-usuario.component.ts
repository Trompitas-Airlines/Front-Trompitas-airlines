import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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



  aeropuertosOrigen:any[] = []
  aeropuertosDestino:any[] = []


  vuelos: Vuelo[] =[]




  mostrarOcultar(){

    if(this.vuelo){
      this.vuelo = false;



    }else{
      this.vuelo = true


    }

  }


ngOnInit(){
  this.vueloServ.getVuelos().subscribe(vuelo=>{
    this.vuelos=vuelo
    console.log(this.vuelos)

    for(let i=0; i<this.vuelos.length; i++){
      this.obtenerAeropuertoById(this.vuelos[i].idAeropuertoOrigen).then((n:any)=>{
        this.aeropuertosOrigen.push(n)
      })

    }
    for(let i=0; i<this.vuelos.length; i++){
      this.obtenerAeropuertoById(this.vuelos[i].idAeropuertoDestino).then((n:any)=>{
        this.aeropuertosDestino.push(n)
      })
    }

    console.log(this.aeropuertosOrigen)
    console.log(this.aeropuertosDestino)

  })


}

obtenerAeropuertoById(id:number):any{
  const nombre=""
  return new Promise((resolve, reject)=>{this.aeroServ.getAeropuertoById(id).subscribe(aeropueto=> {resolve (aeropueto.nombre)})})

}

asientoEconomicos:string[]=[]
asientosPrimeras:string[]=[]
asientosBasicos:string[]=[]
vuelo: boolean = false


vuelosMostrar: Vuelo ={

  idVuelo: 0,
  idAvion: 0,
  origen: "",
  destino: "",
  horaSalida: "",
  horaLlegada: "",
  precioVip: 0,
  precioNormal: 0,
  precioBasico: 0,
  idAeropuertoOrigen:0,
  idAeropuertoDestino:0,

}

constructor(private fb: FormBuilder, private vueloServ:VuelosService, private aeroServ: AeropuertosService, private asiServ: AsientosService, private resServ: ReservasService, private facturaServ:FacturasService ){}
myForm:FormGroup = this.fb.group({

idVuelo: [,[Validators.required]],
idSilla: [,[Validators.required]],


})


error:boolean=false

validarSillas():boolean{
  const nsillas = this.asientosPrimeras.length+this.asientoEconomicos.length+this.asientosBasicos.length
  console.log(nsillas+"abcd")
  if(nsillas === 1 )return true
return false

}

enviar(){
  if(this.myForm.valid && this.validarSillas()){
    this.error=false
    console.log(this.asientosPrimeras)
    console.log(this.asientoEconomicos)
    console.log(this.asientosBasicos)
    console.log(this.myForm.value)
    this.crearAsiento()
    this.mostrarOcultar()
  }else{

    this.error=true
  }
}

obtenerVuelo():any{

  for (let i = 0; i<this.vuelos.length; i++){
    if(this.vuelos[i].idVuelo == this.myForm.value["idVuelo"]){
      return this.vuelos[i];
    }
  }
}

crearAsiento(){
  const vuelo = this.obtenerVuelo()

  let asiento = {
    idAsiento : 0,
    idTipoAsiento:0,
    idAvion: 1,
    ubicacion: "",
    estado: "A"
  }
  console.log(vuelo)
  this.vuelosMostrar = vuelo
  let precio = vuelo.precio




if(this.asientoEconomicos.length != 0 ){
asiento.idTipoAsiento = 3
asiento.ubicacion = this.asientoEconomicos[0]
precio += vuelo.precioAsientoBasico
}

if(this.asientosBasicos.length != 0 ){
  asiento.idTipoAsiento = 2
  asiento.ubicacion = this.asientosBasicos[0]
  precio += vuelo.precioAsientoNormal

  }
if(this.asientosPrimeras.length != 0 ){
   asiento.idTipoAsiento = 1
   asiento.ubicacion = this.asientosPrimeras[0]
   precio += vuelo.precioAsientoVip
   console.log(this.asientosPrimeras)

   }
  console.log(asiento)
this.asiServ.postAsiento({ asiento }).subscribe((res)=> {

  let reserva =  {

    idVuelo :vuelo.idVuelo,
    idAsiento : res.idAsiento,
    idUsuario: 1,
    precioTotal: precio,
    estadoPago : "N",
    fecha :new Date(),
    estado :"A"
  }

  this.resServ.postReserva(reserva).subscribe(data=> {console.log(data)})
  console.log(res)});
}

enviarAhora(){
  if(this.myForm.valid && this.validarSillas()){
    this.error=false
    console.log(this.asientosPrimeras)
    console.log(this.asientoEconomicos)
    console.log(this.asientosBasicos)
    console.log(this.myForm.value)
    this.crearAsientoPago()
    this.mostrarOcultar()
  }else{
    this.error=true
  }
}
crearAsientoPago(){
  const vuelo = this.obtenerVuelo()

  let asiento = {
    idAsiento : 0,
    idTipoAsiento:0,
    idAvion: 1,
    ubicacion: "",
    estado: "A"
  }
  console.log(vuelo)
  this.vuelosMostrar = vuelo
  let precio = vuelo.precio




if(this.asientoEconomicos.length != 0 ){
asiento.idTipoAsiento = 3
asiento.ubicacion = this.asientoEconomicos[0]
precio += vuelo.precioAsientoBasico
}

if(this.asientosBasicos.length != 0 ){
  asiento.idTipoAsiento = 2
  asiento.ubicacion = this.asientosBasicos[0]
  precio += vuelo.precioAsientoNormal

  }
if(this.asientosPrimeras.length != 0 ){
   asiento.idTipoAsiento = 1
   asiento.ubicacion = this.asientosPrimeras[0]
   precio += vuelo.precioAsientoVip
   console.log(this.asientosPrimeras)

   }
  console.log(asiento)
this.asiServ.postAsiento({ asiento }).subscribe((res)=> {

  let reserva =  {

    idVuelo :vuelo.idVuelo,
    idAsiento : res.idAsiento,
    idUsuario: 1,
    precioTotal: precio,
    estadoPago : "P",
    fecha :new Date(),
    estado :"A"
  }

  this.resServ.postReserva(reserva).subscribe(data=> {
    let factura ={

      idReserva :data.idReserva,
      fecha : new Date(),
      estado: "A"


    }
    this.facturaServ.postFactura(factura).subscribe(fac => {console.log(fac)})

    console.log(data)})
  console.log(res)});
}


sasientoPrimera(nAsiento:string){
  this.asientosPrimeras.push(nAsiento)
  this.myForm.controls['idSilla'].setValue(nAsiento)
}

sasientoEconomico(nAsiento:string){
  this.asientoEconomicos.push(nAsiento)
  this.myForm.controls['idSilla'].setValue(nAsiento)
}

sasientoBasicos(nAsiento:string){
  this.asientosBasicos.push(nAsiento)
  this.myForm.controls['idSilla'].setValue(nAsiento)
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
  idAeropuertoOrigen:number;
  idAeropuertoDestino:number;
  vuel_id?:number;
  precio?:0;
  precioAsientoVip?:0;
  precioAsientoNormal?:0;
  precioAsientoBasico?:0;


}





