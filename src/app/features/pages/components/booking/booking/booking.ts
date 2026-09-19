import { Component, computed, inject, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { room } from '../../../../../shared/models/room/room';
import { Room } from '../../../../../core/services/room/room';

/** Strongly-typed shape of the full booking form values. */
export interface BookingFormValue {
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nightlyRate: number;
  discount: number;
  fullName: string;
  email: string;
  phone: string;
  specialRequests: string;
}

/** Strongly-typed reactive form group for the booking form. */
export type BookingForm = FormGroup<{
  roomName: FormControl<string>;
  checkIn: FormControl<string>;
  checkOut: FormControl<string>;
  guests: FormControl<number>;
  nightlyRate: FormControl<number>;
  discount: FormControl<number>;
  fullName: FormControl<string>;
  email: FormControl<string>;
  phone: FormControl<string>;
  specialRequests: FormControl<string>;
}>;

/** Payload sent to the (simulated) booking-confirmation service. */
export interface ConfirmBookingPayload extends BookingFormValue {
  nights: number;
  total: number;
}

/** Result returned by the simulated booking-confirmation call. */
export interface ConfirmBookingResult {
  success: boolean;
  message: string;
}

/** Basic phone number pattern: digits, spaces, +, -, parentheses, 7-20 chars total. */
const PHONE_PATTERN = /^[+]?[\d\s()-]{7,20}$/;

@Component({
  selector: 'app-booking',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './booking.html',
  styleUrl: './booking.css',
})
export class Booking {
  private readonly activatedRoute=inject(ActivatedRoute);
 private readonly roomService=inject(Room);
 roomid:string|null=null;
 room:WritableSignal<room|null>=signal<room|null>(null);
 private platformid = inject(PLATFORM_ID);
 ngOnInit():void{
 this.getroomid();
 if(isPlatformBrowser(this.platformid)){
      //localStorage.setItem('pageUrl','/products')
     }
 }
 getroomid(){
 this.activatedRoute.paramMap.subscribe({
  next:(res)=>{
    this.roomid=res.get('id');
    this.getroom(this.roomid);
  },
 })
 }
 getroom(id:string|null){
  this.roomService.getroombyid(id).subscribe({
      next: (res) => {
       this.room.set(res);
       console.log(res);
      },error:(err)=>{
      }
    });
  }
  readonly isLoading = signal<boolean>(false);
  readonly formError = signal<string>('');
  readonly successMessage = signal<string>('');

  readonly bookingForm: BookingForm;

  constructor(private readonly fb: FormBuilder) {
    this.bookingForm = this.fb.nonNullable.group({
      roomName: this.fb.nonNullable.control('', [Validators.required]),
      checkIn: this.fb.nonNullable.control('', [Validators.required]),
      checkOut: this.fb.nonNullable.control('', [Validators.required]),
      guests: this.fb.nonNullable.control(1, [Validators.required, Validators.min(1)]),
      nightlyRate: this.fb.nonNullable.control(0, [Validators.required, Validators.min(1)]),
      discount: this.fb.nonNullable.control(0, [Validators.min(0)]),
      fullName: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(2)]),
      email: this.fb.nonNullable.control('', [Validators.required, Validators.email]),
      phone: this.fb.nonNullable.control('', [Validators.required, Validators.pattern(PHONE_PATTERN)]),
      specialRequests: this.fb.nonNullable.control(''),
    });
  }

  /** Nights derived from the two date inputs (0 if not both set or invalid). */
  readonly nights = computed(() => {
    const checkIn = this.bookingForm.controls.checkIn.value;
    const checkOut = this.bookingForm.controls.checkOut.value;
    if (!checkIn || !checkOut) return 0;

    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const diffMs = outDate.getTime() - inDate.getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  });

  readonly subtotal = computed(() => {
    const rate = this.bookingForm.controls.nightlyRate.value || 0;
    return rate * this.nights();
  });

  readonly discountValue = computed(() => this.bookingForm.controls.discount.value || 0);

  readonly total = computed(() => Math.max(0, this.subtotal() - this.discountValue()));

  readonly fullNameErrorMessage = computed(() => {
    const control = this.bookingForm.controls.fullName;
    if (!control.errors) return '';
    if (control.errors['required']) return 'Full name is required.';
    if (control.errors['minlength']) return 'Please enter your full name.';
    return 'Invalid name.';
  });

  readonly emailErrorMessage = computed(() => {
    const control = this.bookingForm.controls.email;
    if (!control.errors) return '';
    if (control.errors['required']) return 'Email is required.';
    if (control.errors['email']) return 'Please enter a valid email address.';
    return 'Invalid email.';
  });

  readonly phoneErrorMessage = computed(() => {
    const control = this.bookingForm.controls.phone;
    if (!control.errors) return '';
    if (control.errors['required']) return 'Phone number is required.';
    if (control.errors['pattern']) return 'Please enter a valid phone number.';
    return 'Invalid phone number.';
  });
  readonly checkInErrorMessage = computed(() =>
    this.bookingForm.controls.checkIn.errors?.['required'] ? 'Check-in date is required.' : ''
  );
  readonly checkOutErrorMessage = computed(() =>
    this.bookingForm.controls.checkOut.errors?.['required'] ? 'Check-out date is required.' : ''
  );

  readonly nightlyRateErrorMessage = computed(() => {
    const control = this.bookingForm.controls.nightlyRate;
    if (!control.errors) return '';
    if (control.errors['required']) return 'Nightly rate is required.';
    if (control.errors['min']) return 'Nightly rate must be greater than 0.';
    return 'Invalid value.';
  });

  /** True only once the control is invalid AND the user has interacted with it. */
  isInvalid(controlName: keyof BookingFormValue): boolean {
    const control: AbstractControl | null = this.bookingForm.get(controlName as string);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  /**
   * Simulated submit handler. Replace the setTimeout block with a real call
   * to your booking service, e.g.:
   *
   *   this.bookingService.confirm(payload).subscribe({
   *     next: (res) => { ...set successMessage... },
   *     error: (err) => { ...set formError... },
   *   });
   */
  onConfirmBooking(): void {
    this.formError.set('');
    this.successMessage.set('');

    if (this.bookingForm.invalid || this.nights() <= 0) {
      this.bookingForm.markAllAsTouched();
      if (this.nights() <= 0) {
        this.formError.set('Check-out date must be after check-in date.');
      }
      return;
    }

    const value: BookingFormValue = this.bookingForm.getRawValue();
    const payload: ConfirmBookingPayload = {
      ...value,
      nights: this.nights(),
      total: this.total(),
    };

    this.isLoading.set(true);

    // --- Simulated async booking-confirmation call ---
    setTimeout(() => {
      const result: ConfirmBookingResult = this.simulateConfirm(payload);
      this.isLoading.set(false);

      if (result.success) {
        this.successMessage.set(result.message);
      } else {
        this.formError.set(result.message);
      }
    }, 1200);
  }

  /** Replace with a real HTTP call in production. */
  private simulateConfirm(payload: ConfirmBookingPayload): ConfirmBookingResult {
    if (payload.fullName && payload.email && payload.phone) {
      return { success: true, message: 'Booking confirmed! A confirmation email is on its way.' };
    }
    return { success: false, message: 'Something went wrong. Please check your details and try again.' };
  }
}
