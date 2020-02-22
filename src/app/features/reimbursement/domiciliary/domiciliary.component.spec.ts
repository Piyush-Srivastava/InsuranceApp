import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomiciliaryComponent } from './domiciliary.component';

describe('DomiciliaryComponent', () => {
  let component: DomiciliaryComponent;
  let fixture: ComponentFixture<DomiciliaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomiciliaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomiciliaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
