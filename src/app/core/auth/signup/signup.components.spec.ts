import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponents } from './signup.components';

describe('SignupComponents', () => {
  let component: SignupComponents;
  let fixture: ComponentFixture<SignupComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupComponents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
