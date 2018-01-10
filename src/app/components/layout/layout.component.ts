import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  username: string;
  authStateSubscription: Subscription;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    //private auth: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }

  ngOnInit() {

    this.authStateSubscription = this.afAuth.authState.subscribe((usuario) => {

      if (usuario) {
        this.username = usuario.displayName ? usuario.displayName : usuario.email;
        //console.log(usuario);


      } else {
        this.username = null;
        return;

      }


    });

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    if (this.authStateSubscription) {
      this.authStateSubscription.unsubscribe();
    }

  }

  logout() {
    console.log("logout");
    this.afAuth.auth.signOut();
    this.router.navigate(["/login"]);

  }

}
