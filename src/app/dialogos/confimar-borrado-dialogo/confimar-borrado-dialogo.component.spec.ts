import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfimarBorradoDialogoComponent } from './confimar-borrado-dialogo.component';

describe('ConfimarBorradoDialogoComponent', () => {
  let component: ConfimarBorradoDialogoComponent;
  let fixture: ComponentFixture<ConfimarBorradoDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfimarBorradoDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfimarBorradoDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
