import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAnuncioDialogoComponent } from './editar-anuncio-dialogo.component';

describe('EditarAnuncioDialogoComponent', () => {
  let component: EditarAnuncioDialogoComponent;
  let fixture: ComponentFixture<EditarAnuncioDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarAnuncioDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarAnuncioDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
