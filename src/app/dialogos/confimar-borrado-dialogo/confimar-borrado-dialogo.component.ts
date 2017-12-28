import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confimar-borrado-dialogo',
  templateUrl: './confimar-borrado-dialogo.component.html',
  styleUrls: ['./confimar-borrado-dialogo.component.scss']
})
export class ConfimarBorradoDialogoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConfimarBorradoDialogoComponent>
  ) { }

  ngOnInit() {
  }

}
