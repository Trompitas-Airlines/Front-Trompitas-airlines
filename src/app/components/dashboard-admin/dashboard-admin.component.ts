import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AsientosService } from 'src/app/services/asientos.service';
import { AvionesService } from 'src/app/services/aviones.service';
import { VuelosService } from 'src/app/services/vuelos.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent {
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





asientoEconomicos:string[]=[]
asientosPrimeras:string[]=[]
asientosBasicos:string[]=[]

vuelo:boolean=false;


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

constructor(private fb: FormBuilder, private vueloServ:VuelosService, private aeroServ: AsientosService, private avionServ:AvionesService){}
myForm:FormGroup = this.fb.group({



idAeropuertoOrigen: [,[Validators.required]],
idAeropuertoDestino: [,[Validators.required]],
ModeloAvion:[,[Validators.required]],
precio: [,[Validators.required]],
horaSalida: [,[Validators.required]],
horaLlegada: [,[Validators.required]],
precioAsientoVip: [,[Validators.required]],
precioAsientoNormal: [,[Validators.required]],
precioAsientoBasico: [,[Validators.required]],



})
error:boolean=false
bien:boolean=false


enviar(){
  const validacion: boolean = this.myForm.value.precio < 10000 || this.myForm.value.precioAsientoVip < 10000 || this.myForm.value.precioAsientoNormal < 10000 || this.myForm.value.precioAsientoBasico < 10000
  if(this.myForm.invalid || validacion){
    console.log(validacion)
    console.log(this.myForm.controls["precioAsientoVip"])
    this.error=true
    return
  }
  this.error = false
  const{ModeloAvion, ...resto} = this.myForm.value


  console.log(ModeloAvion)
  console.log(resto)

  this.vueloServ.postVuelo({...resto, estado:"A"}).subscribe(res=>{console.log(res)

    this.avionServ.postAvion({modelo: ModeloAvion, estado:"A"}).subscribe(avion=>{console.log(avion)

    this.bien=true})
  })

    console.log(this.asientosPrimeras)
    console.log(this.asientoEconomicos)
    console.log(this.asientosBasicos)
    console.log(this.myForm.value)
    this.obtenerTotal()
    this.mostrarOcultar()
  }

obtenerTotal(){

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
}

