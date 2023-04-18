import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardwareAddEditComponent } from './hardware-add-edit.component';

describe('HardwareAddEditComponent', () => {
  let component: HardwareAddEditComponent;
  let fixture: ComponentFixture<HardwareAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HardwareAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HardwareAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
