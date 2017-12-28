import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarImagenDialogoComponent } from './agregar-imagen-dialogo.component';

describe('AgregarImagenDialogoComponent', () => {
  let component: AgregarImagenDialogoComponent;
  let fixture: ComponentFixture<AgregarImagenDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarImagenDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarImagenDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
