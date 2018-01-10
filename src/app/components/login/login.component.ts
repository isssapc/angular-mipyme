import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  //error: boolean = false;
  alert: string = null;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router

  ) { }

  ngOnInit() {
  }

  login(form: NgForm) {

    this.afAuth.auth.signInWithEmailAndPassword(form.value.email, form.value.password)
      .then((user: firebase.User) => {

        //this.error = false;
        this.alert = null;
        console.log(user);
        this.router.navigate(["/tablero"]);

      })
      .catch((error: firebase.auth.Error) => {
        //this.error = true;
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          this.alert = "La contraseña es inválida";
        } else {
          console.log(errorMessage);
          this.alert = "Su cuenta de acceso no ha sido validada, por favor compruebe sus datos";

        }
        console.log(error);
      });

    //console.log(form.value);
    //console.log(form.value.email);



  }

}
