import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistarcampanhasComponent } from './registarcampanhas.component';

describe('RegistarcampanhasComponent', () => {
  let component: RegistarcampanhasComponent;
  let fixture: ComponentFixture<RegistarcampanhasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistarcampanhasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistarcampanhasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
