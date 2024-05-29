import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistardoadorComponent } from './registardoador.component';

describe('RegistardoadorComponent', () => {
  let component: RegistardoadorComponent;
  let fixture: ComponentFixture<RegistardoadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistardoadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistardoadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
