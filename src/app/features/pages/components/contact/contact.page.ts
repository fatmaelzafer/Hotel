import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Rooms } from '../../../../core/services/rooms/rooms';
import { room } from '../../../../shared/models/room/room';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { roomsearchresponse } from '../../../../shared/models/search/search';
import { Roomsearch } from '../../../../core/services/search/roomsearch';
@Component({
  selector: 'app-contact',
  imports: [CommonModule,NgxPaginationModule],
  templateUrl: './contact.page.html',
  styleUrl: './contact.page.css',
})
export class ContactPage {
rooms: WritableSignal<room[]> = signal<room[]>([]);
  readonly isLoading = signal<boolean>(false);
  readonly error = signal<string | null>(null);
  private readonly roomss = inject(Roomsearch);

  checkIn: string | null = null;
  checkOut: string | null = null;
  guests: number | null = null;
  page: number = 1;

  private readonly activatedRoute = inject(ActivatedRoute);

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Read the route params once (synchronously, on the initial snapshot)
    // and only THEN kick off the search — avoids the race where the API
    // call could fire before checkIn/checkOut/guests are populated.
    const params = this.activatedRoute.snapshot.paramMap;
    this.checkIn = params.get('checkIn');
    this.checkOut = params.get('checkOut');
    const guestsParam = params.get('guests');
    this.guests = guestsParam !== null ? Number(guestsParam) : null;

    this.loadRooms();
  }

  loadRooms(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.roomss.getrooms(this.page, this.checkOut, this.checkIn, this.guests).subscribe({
      next: (res) => {
        console.log(res.data);
        // Fall back to an empty array whenever the backend returns
        // null/undefined for "no results" instead of an empty array —
        // this is what was crashing the @for/paginate pipe.
        this.rooms.set(res.data ?? []);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.error.set("We couldn't load the rooms. Please try again.");
        this.isLoading.set(false);
      },
    });
  }

  onSelect(room: room): void {
    this.router.navigate(['/booking', room._id]);
  }

  trackByRoomId(_index: number, room: room): string {
    return room.id;
  }

  changepage(newpage: number): void {
    this.page = newpage;
    this.loadRooms();
  }
}
