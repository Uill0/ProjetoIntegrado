import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}
  
    canActivate(): boolean {
        if (this.authService.loginSuccess) {
          // Login bem-sucedido, permitir acesso à rota 'home'
          return true;
        } else {
          // Login com falha, redirecionar para a rota 'login'
          this.router.navigate(['/login']);
          return false;
        }
      }
    }