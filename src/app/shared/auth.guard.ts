import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private fireauth: AngularFireAuth, private router: Router) {}
  
    async canActivate(): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            // Use o método onAuthStateChanged da instância de AngularFireAuth
            this.fireauth.onAuthStateChanged((user) => {
                if (user) {
                    // O usuário está autenticado, permitir acesso a todas as rotas
                    resolve(true);
                } else {
                    // O usuário não está autenticado, redirecionar para a rota de login
                    this.router.navigate(['/login']);  
                    resolve(false);
                }
            });
        });
    }
}
