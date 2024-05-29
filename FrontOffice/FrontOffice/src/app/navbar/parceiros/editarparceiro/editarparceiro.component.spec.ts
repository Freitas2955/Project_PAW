import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarparceiroComponent } from './editarparceiro.component';

describe('EditarparceiroComponent', () => {
  let component: EditarparceiroComponent;
  let fixture: ComponentFixture<EditarparceiroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarparceiroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarparceiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
