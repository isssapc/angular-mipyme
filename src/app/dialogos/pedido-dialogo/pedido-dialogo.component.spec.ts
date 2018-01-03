import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoDialogoComponent } from './pedido-dialogo.component';

describe('PedidoDialogoComponent', () => {
  let component: PedidoDialogoComponent;
  let fixture: ComponentFixture<PedidoDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
