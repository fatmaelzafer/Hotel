import { Component, computed, inject, PLATFORM_ID, signal, Signal, WritableSignal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { room } from '../../../../../shared/models/room/room';
import { Room } from '../../../../../core/services/room/room';
import { toSignal } from '@angular/core/rxjs-interop';
import { Bookingservice } from '../../../../../core/services/booking/bookingservice';

/** Strongly-typed shape of the full booking form values. */
export interface BookingFormValue {
  roomNumber: string;
  roomType: string;
  checkIn: string;
  checkout: string;
  guests: number;
  fullName: string;
  email: string;
  phone: string;
  specialRequests: string;
}

export interface ConfirmBookingResult {
  success: boolean;
  message: string;
}

const PHONE_PATTERN = /^[+]?[\d\s()-]{7,20}$/;

@Component({
  selector: 'app-booking',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './booking.html',
  styleUrl: './booking.css',
})
export class Booking {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly roomService = inject(Room);
  private readonly bookingservice = inject(Bookingservice);
  private platformid = inject(PLATFORM_ID);
  readonly dateRangeLabel: Signal<string>;
  roomid: string = '';
  room: WritableSignal<room | null> = signal<room | null>(null);
  booking: WritableSignal<any> = signal<any>(null);
  flag:boolean=true;
  readonly isLoading = signal<boolean>(false);
  readonly formError = signal<string>('');
  readonly successMessage = signal<string>('');

  readonly bookingForm: FormGroup;
  readonly nights: Signal<number>;
  readonly total: Signal<number>;

  constructor(private readonly fb: FormBuilder, private readonly router: Router) {
    // 1) نبني الفورم الأول
    this.bookingForm = this.fb.nonNullable.group({
      roomNumber: this.fb.nonNullable.control('', [Validators.required]),
      roomType: this.fb.nonNullable.control('', [Validators.required]),
      checkIn: this.fb.nonNullable.control('', [Validators.required]),
      checkout: this.fb.nonNullable.control('', [Validators.required]), // اسم الحقل: checkout (بحروف صغيرة) عشان يطابق الـ API
      guests: this.fb.nonNullable.control(1, [Validators.required, Validators.min(1)]),
      fullName: this.fb.nonNullable.control('', [Validators.required]),
      email: this.fb.nonNullable.control('', [Validators.required, Validators.email]),
      phone: this.fb.nonNullable.control('', [Validators.required, Validators.pattern(PHONE_PATTERN)]),
      specialRequests: this.fb.nonNullable.control(''),
    });

    // 2) دلوقتي bookingForm موجود فعليًا، فآمن إننا نستخدمه جوه toSignal
    //    لاحظي: get('checkout') مش get('checkOut') — لازم يطابق اسم الـ control بالظبط
    const checkInValue = toSignal(this.bookingForm.get('checkIn')!.valueChanges, { initialValue: '' });
    const checkOutValue = toSignal(this.bookingForm.get('checkout')!.valueChanges, { initialValue: '' });
    // ✅ الحل الصحيح (إذا أردت استخدامه في الـ HTML):


// وتكتب قيمته داخل الـ constructor هكذا:
    this.dateRangeLabel = computed(() => `${checkInValue()} - ${checkOutValue()}`);
    this.nights = computed(() => {
      const checkIn = checkInValue();
      const checkOut = checkOutValue();
      if (!checkIn || !checkOut) return 0;

      const inDate = new Date(checkIn);
      const outDate = new Date(checkOut);
      const diffMs = outDate.getTime() - inDate.getTime();
      const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    });

    this.total = computed(() => Math.max(this.room()?.price ?? 0, 0) * this.nights());
  }

  ngOnInit(): void {
    this.getroomid();
    if (isPlatformBrowser(this.platformid)) {
      //localStorage.setItem('pageUrl','/products')
    }
  }

  getroomid(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.roomid = res.get('id') ?? ''; // ← "=" مش "!=" — كانت السبب في إن الـ id مكنش بيتحفظ خالص

        this.getroom(this.roomid);
      },
    });
  }

  getroom(id: string): void {
    this.roomService.getroombyid(id).subscribe({
      next: (res) => {
        this.room.set(res);
        this.bookingForm.patchValue({
          roomNumber: res.roomNumber,
          roomType: res.roomType._id,
          guests: res.roomCapacity,

        });
      },
      error: (err) => {
        //console.log(err);

        this.formError.set("We couldn't load this room. Please try again.");
      },
    });
  }

  fullNameErrorMessage(): string {
    const control = this.bookingForm.get('fullName');
    if (!control?.errors) return '';
    if (control.errors['required']) return 'Full name is required.';
    if (control.errors['minlength']) return 'Please enter your full name.';
    return 'Invalid name.';
  }

  emailErrorMessage(): string {
    const control = this.bookingForm.get('email');
    if (!control?.errors) return '';
    if (control.errors['required']) return 'Email is required.';
    if (control.errors['email']) return 'Please enter a valid email address.';
    return 'Invalid email.';
  }

  phoneErrorMessage(): string {
    const control = this.bookingForm.get('phone');
    if (!control?.errors) return '';
    if (control.errors['required']) return 'Phone number is required.';
    if (control.errors['pattern']) return 'Please enter a valid phone number.';
    return 'Invalid phone number.';
  }

  checkInErrorMessage(): string {
    return this.bookingForm.get('checkIn')?.errors?.['required'] ? 'Check-in date is required.' : '';
  }

  checkOutErrorMessage(): string {
    return this.bookingForm.get('checkout')?.errors?.['required'] ? 'Check-out date is required.' : '';
  }

  /** True only once the control is invalid AND the user has interacted with it. */
  isInvalid(controlName: keyof BookingFormValue): boolean {
    const control: AbstractControl | null = this.bookingForm.get(controlName as string);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  /** بتحول تاريخ الـ <input type="date"> (YYYY-MM-DD) لصيغة ISO كاملة زي ما الـ API مستنيها. */
  private toIsoDateTime(dateStr: string): string {
    return new Date(`${dateStr}T14:00:00.000Z`).toISOString();
  }
  geturl(id: string) {
      this.bookingservice.getbookingdata(id).subscribe({
       next: (res) => {
      if (isPlatformBrowser(this.platformid) && res?.url) {
        window.location.href = res.url;
      } else {
        this.formError.set('Could not start the payment process. Please try again.');
      }
    },
    error: (err) => {
      console.log(err);
      this.formError.set('Failed to load payment page. Please try again.');
    },
      });
    }

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

    const value = this.bookingForm.getRawValue();
    const payload = {
      ...value,
      checkIn: this.toIsoDateTime(value.checkIn),
      checkout: this.toIsoDateTime(value.checkout),
    };

    this.isLoading.set(true);

    this.bookingservice.sendbookingdata(payload).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.booking.set(res);
        this.successMessage.set('Booking confirmed!');
        console.log(res);
        //this.router.navigate(['/booking-confirmed'], res.reservationID);
        this.geturl(res.reservationID);
        this.flag=false;
      },
      error: (err) => {
        this.isLoading.set(false);
         console.log(JSON.stringify(localStorage.getItem('userToken')));
        console.log(err);
        console.log(payload);
        this.formError.set(err.error?.message ?? 'Booking failed. Please try again.');
      },
    });
  }
  onBackToHome(): void {
    this.router.navigate(['/home']);
  }
}
