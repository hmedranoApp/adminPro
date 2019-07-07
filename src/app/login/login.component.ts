import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  correo: string;
  auth2: any;

  constructor(public router: Router, public usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.correo = localStorage.getItem('email') || '';
    if (this.correo.length > 1) {
      this.recuerdame = true;
    }
  }

  googleInit() {
   gapi.load('auth2', () => {
    this.auth2 = gapi.auth2.init({
      client_id: '177354101042-0hn0rn15l815qjpoao3l5r3sb559hk90.apps.googleusercontent.com',
      cookiepolicy: 'single_host_origin',
      scope: 'profile email'
    });
    this.attachSignIn( document.getElementById('btnGoogle'));
   });
  }

  attachSignIn( element ) {
   this.auth2.attachClickHandler( element, {}, (googleUser) => {
    // let profile = googleUser.getBasicProfile();
    let token = googleUser.getAuthResponse().id_token;
    this.usuarioService.loginGoogle(token)
    .subscribe( () => window.location.href = '#dashboard');
   });
  }

  ingresar( forma: NgForm ) {

    if (forma.invalid) {
      return;
    }

    let usuario = new Usuario(null, forma.value.email, forma.value.password);
    this.usuarioService.login(usuario, forma.value.recuerdame)
    .subscribe(res => this.router.navigate(['/dashboard']));
  }

}
