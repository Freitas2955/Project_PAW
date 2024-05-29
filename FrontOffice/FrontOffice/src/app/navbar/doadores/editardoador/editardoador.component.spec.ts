import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditardoadorComponent } from './editardoador.component';

describe('EditardoadorComponent', () => {
  let component: EditardoadorComponent;
  let fixture: ComponentFixture<EditardoadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditardoadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditardoadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
