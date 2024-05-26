import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistoEntidadesComponent } from './registo-entidades.component';

describe('RegistoEntidadesComponent', () => {
  let component: RegistoEntidadesComponent;
  let fixture: ComponentFixture<RegistoEntidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistoEntidadesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistoEntidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
