import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

import "rxjs/add/operator/take";
import "rxjs/add/operator/do";

@Injectable()
export class AuthGuard implements CanActivate {

  authStateSubscription: Subscription;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,

  ): Observable<boolean> | Promise<boolean> | boolean {

    return this.afAuth.authState
    .take(1)
    .map(authState => !!authState)
    .do(authenticated => {
      if (!authenticated) {
        console.log("NO autenticado");
        
        this.router.navigate(["/login"]);
      } else {

        console.log("SI autenticado");
      }
      
    });




/*     this.authStateSubscription = this.afAuth.authState.subscribe(user => {

      if (user) {
        console.log("usuario autenticado");

        return true;

      } else {
        console.log("ningún usuario autenticado");

        this.router.navigate(["/login"]);
        return false;
      }

    });

    return true; */



  }

/* 
  ngOnDestroy(): void {

    console.log("destroy guard");
    if (this.authStateSubscription) {
      console.log("elimino la subscripcion del guard");

      this.authStateSubscription.unsubscribe();
    }

  } */
}
