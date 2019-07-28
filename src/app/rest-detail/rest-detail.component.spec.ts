import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestDetailComponent } from './rest-detail.component';

describe('RestDetailComponent', () => {
  let component: RestDetailComponent;
  let fixture: ComponentFixture<RestDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
