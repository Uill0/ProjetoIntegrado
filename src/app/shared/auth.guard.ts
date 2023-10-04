import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private fireauth: AngularFireAuth, private router: Router) {}

  canActivate(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.fireauth.onAuthStateChanged((user) => {
        if (user) {
          if (user.emailVerified) {
            resolve(true); // O usuário está autenticado e verificado, permitir acesso a todas as rotas
          } else {
          this.router.navigate(['/verify-email']);
            resolve(false); // O usuário está autenticado, mas não verificado, não permitir acesso
          }
        } else {
          // O usuário não está autenticado, redirecionar para a rota de login
          this.router.navigate(['/login']);
          resolve(false);
        }
      });
    });
  }
}
