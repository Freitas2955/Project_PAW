import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarentidadesComponent } from './editarentidades.component';

describe('EditarentidadesComponent', () => {
  let component: EditarentidadesComponent;
  let fixture: ComponentFixture<EditarentidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarentidadesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarentidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
