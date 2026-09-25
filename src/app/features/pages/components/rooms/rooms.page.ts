
import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Rooms } from '../../../../core/services/rooms/rooms';
import { room } from '../../../../shared/models/room/room';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rooms',
  imports: [CommonModule],
  templateUrl: './rooms.page.html',
  styleUrl: './rooms.page.css',
})
export class RoomsPage {
  //private readonly roomsService = inject(RoomsService);

  rooms : WritableSignal<room[]>=signal<room[]>([]);
  readonly isLoading = signal<boolean>(false);
  readonly error = signal<string | null>(null);
  private readonly roomss=inject(Rooms);
  //
  // SVG path data for each icon, keyed by name. Kept as plain outline strokes
  // (viewBox 0 0 24 24) so every icon in the card renders the same weight/size.
  /*readonly icons: Record<RoomIcon | 'guests' | 'view', string> = {
    guests: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z',
    bed: 'M2.25 18.75v-6.75a2.25 2.25 0 012.25-2.25h15a2.25 2.25 0 012.25 2.25v6.75M2.25 18.75h19.5M2.25 18.75v1.5M21.75 18.75v1.5M6 9.75V6.75A2.25 2.25 0 018.25 4.5h1.5A2.25 2.25 0 0112 6.75v3',
    view: 'M2.25 12s3.75-7.5 9.75-7.5 9.75 7.5 9.75 7.5-3.75 7.5-9.75 7.5S2.25 12 2.25 12zM15 12a3 3 0 11-6 0 3 3 0 016 0z',
    breakfast: 'M3 3h13.5v9.75a4.5 4.5 0 01-4.5 4.5h-4.5a4.5 4.5 0 01-4.5-4.5V3zm13.5 3.75H21a2.25 2.25 0 012.25 2.25v.75A2.25 2.25 0 0121 12h-4.5M3 21h13.5',
    ac: 'M12 2.25v19.5m0-19.5l3 3m-3-3l-3 3m3 16.5l3-3m-3 3l-3-3M2.25 12h19.5m-19.5 0l3-3m-3 3l3 3m16.5-3l-3-3m3 3l-3 3',
    sofa: 'M3.75 9.75V15a2.25 2.25 0 002.25 2.25h12A2.25 2.25 0 0020.25 15V9.75M3.75 9.75a1.5 1.5 0 011.5-1.5h1.5m-3 1.5v6m16.5-6a1.5 1.5 0 00-1.5-1.5h-1.5m3 1.5v6M6.75 8.25v-1.5A1.5 1.5 0 018.25 5.25h7.5a1.5 1.5 0 011.5 1.5v1.5',
    seating: 'M8.25 4.5a3.75 3.75 0 117.5 0v3.75h-7.5V4.5zM4.5 12v6.75A2.25 2.25 0 006.75 21h10.5a2.25 2.25 0 002.25-2.25V12a3 3 0 00-3-3h-9a3 3 0 00-3 3z',
    'living-room': 'M3 9.75l9-6.75 9 6.75V19.5a1.5 1.5 0 01-1.5 1.5h-3.75a.75.75 0 01-.75-.75V15a2.25 2.25 0 00-4.5 0v5.25a.75.75 0 01-.75.75H4.5a1.5 1.5 0 01-1.5-1.5V9.75z',
    dining: 'M8.25 3v6.75m0 0a2.25 2.25 0 104.5 0m-4.5 0V3m4.5 6.75V3M15.75 3v18M15.75 9.75h3.75M8.25 9.75V21',
    bedrooms: 'M3.75 21V8.25A2.25 2.25 0 016 6h12a2.25 2.25 0 012.25 2.25V21M3.75 21h16.5M3.75 21v-3.375c0-.621.504-1.125 1.125-1.125h1.25c.621 0 1.125.504 1.125 1.125V21m11.25 0v-3.375c0-.621-.504-1.125-1.125-1.125h-1.25c-.621 0-1.125.504-1.125 1.125V21',
  };*/
   constructor(
    private router: Router
  ) { }
  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.roomss.getrooms().subscribe({
      next: (res) => {
        this.rooms.set(res);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('We couldn\'t load the rooms. Please try again.');
        console.log(err);
        this.isLoading.set(false);
      },
    });
  }

  onSelect(room: room): void {
     this.router.navigate(['/booking', room._id])
    //this.roomsService.selectRoom(room.id);
  }

  trackByRoomId(_index: number, room: room): string {
    return room.id;
  }

}

