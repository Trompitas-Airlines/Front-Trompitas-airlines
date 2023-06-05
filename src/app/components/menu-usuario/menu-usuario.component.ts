import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AeropuertosService } from 'src/app/services/arepuertos.service';
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

constructor(private fb: FormBuilder, private vueloServ:VuelosService, private aeroServ: AeropuertosService){}
myForm:FormGroup = this.fb.group({

idVuelo: [,[Validators.required]],
idSilla: [,[Validators.required]],


})


enviar(){

  if(this.myForm.valid){
    console.log(this.asientosPrimeras)
    console.log(this.asientoEconomicos)
    console.log(this.asientosBasicos)
    console.log(this.myForm.value)
    this.obtenerTotal()
  }

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





