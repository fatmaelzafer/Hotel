import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Guestview } from './guestview';

describe('Guestview', () => {
  let component: Guestview;
  let fixture: ComponentFixture<Guestview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Guestview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Guestview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
