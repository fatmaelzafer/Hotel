import { Component, computed, inject, Input, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { Bookingservice } from '../../../../core/services/booking/bookingservice';
@Component({
  selector: 'app-booking-confirmation',
  imports: [],
  templateUrl: './booking-confirmation.html',
  styleUrl: './booking-confirmation.css',
})
export class BookingConfirmation {
   /** Pass the confirmed booking details in from the parent/route resolver. */
   bookingid:string|null='';
   booking:WritableSignal<any>=signal<any>(null);
   private readonly activatedRoute=inject(ActivatedRoute) ;
   private readonly bookingservice=inject(Bookingservice);




  constructor(private readonly router: Router,) {}

  //readonly dateRangeLabel = computed(() => `${this.booking.checkIn} - ${this.booking.checkOut}`);

  

  /** Simple fallback reference generator if the backend doesn't supply one. */
  private generateReference(): string {
    const random = Math.floor(100000 + Math.random() * 900000);
    return `NVS-${random}`;
  }
}
