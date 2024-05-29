import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistarparceiroComponent } from './registarparceiro.component';

describe('RegistarparceiroComponent', () => {
  let component: RegistarparceiroComponent;
  let fixture: ComponentFixture<RegistarparceiroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistarparceiroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistarparceiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
