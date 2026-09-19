import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Guestroom } from './guestroom';

describe('Guestroom', () => {
  let component: Guestroom;
  let fixture: ComponentFixture<Guestroom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Guestroom]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Guestroom);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
