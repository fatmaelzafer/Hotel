import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mainhome } from './mainhome';

describe('Mainhome', () => {
  let component: Mainhome;
  let fixture: ComponentFixture<Mainhome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mainhome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mainhome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
