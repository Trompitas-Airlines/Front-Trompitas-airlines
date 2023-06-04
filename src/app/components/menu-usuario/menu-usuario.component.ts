import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-menu-usuario',
  templateUrl: './menu-usuario.component.html',
  styleUrls: ['./menu-usuario.component.css']
})



export class MenuUsuarioComponent {


  vuelos: Vuelo[] = [
    { idVuelo: 1, idAvion:11, origen: 'Cali', destino: 'Bogota',  horaSalida:'7pm', horaLlegada:'9pm',  precioVip: 100, precioNormal: 80, precioBasico:50 },
    { idVuelo: 2, idAvion:22, origen: 'Medellin', destino: 'Buenos Aires', horaSalida:'7pm', horaLlegada:'9pm', precioVip: 150, precioNormal: 90, precioBasico:60  },
    { idVuelo: 3, idAvion:33,  origen: 'Barranquilla', destino: 'New york', horaSalida:'7pm', horaLlegada:'9pm', precioVip: 200, precioNormal: 100, precioBasico:70 }
  ];



asientoEconomicos:string[]=[]
asientosPrimeras:string[]=[]
asientosBasicos:string[]=[]

constructor(private fb: FormBuilder){}
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


}





