import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    // const promesa = new Promise((resolve, reject) => {
    //   // CUERPO SINCRONO

    //   // PARTE ASINCRONA RESOLVE OR REJECT
    //   if (false) {
    //     resolve('Promesa resuelta');
    //   } else {
    //     reject('Se rechazo una promesa')
    //   }
    // });

    // then: success
    // catch: error
    // finally: despues de que se termine

    // proceso asincrono
    // promesa.then((resolve) => {
    //   console.log('TERMINE CON EXITO')
    // }).catch((reject) => {
    //   console.log('TERMINE CON UN ERROR :(')
    // })
    this.getUsuarios().then(usuarios => {
      console.log(usuarios);
    })
  }

  getUsuarios() {
    return new Promise(resolve => {
      fetch('https://reqres.in/api/users')
        .then(resp => resp.json())
        .then(body => resolve(body.data))
    });
  }

}
