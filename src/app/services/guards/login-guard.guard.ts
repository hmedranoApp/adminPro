import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(public usuarioservice: UsuarioService, public ruoter: Router) {
  }

  canActivate() {
    if (this.usuarioservice.estaLogeado() ) {
      console.log('Paso por el login Guard');
      return true;
    } else {
      console.log('Bloqueado por el Guard');
      this.ruoter.navigate(['/login']);
      return false;
    }
  }
}
