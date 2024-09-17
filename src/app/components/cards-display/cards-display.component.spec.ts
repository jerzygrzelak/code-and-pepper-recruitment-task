import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsDisplayComponent } from './cards-display.component';

describe('CardsDisplayComponent', () => {
  let component: CardsDisplayComponent;
  let fixture: ComponentFixture<CardsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardsDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
