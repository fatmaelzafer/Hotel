import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Userrooms } from './userrooms';

describe('Userrooms', () => {
  let component: Userrooms;
  let fixture: ComponentFixture<Userrooms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Userrooms]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Userrooms);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
