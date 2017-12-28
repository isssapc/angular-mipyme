import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarUsuarioDialogoComponent } from './agregar-usuario-dialogo.component';

describe('AgregarUsuarioDialogoComponent', () => {
  let component: AgregarUsuarioDialogoComponent;
  let fixture: ComponentFixture<AgregarUsuarioDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarUsuarioDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarUsuarioDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
