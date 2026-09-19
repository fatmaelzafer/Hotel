
import { Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  WritableSignal,
  computed,
  inject,
   signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Roomsearch } from '../../../../../../core/services/search/roomsearch';
import { roomsearchresponse } from '../../../../../../shared/models/search/search';
type OpenPanel = 'checkIn' | 'checkOut' | 'guests' | null;
@Component({
  selector: 'app-mainhome',
  imports: [CommonModule,FormsModule],
  templateUrl: './mainhome.html',
  styleUrl: './mainhome.css',
})
export class Mainhome {
  //private readonly roomsSearchService = inject(RoomsSearchService);
  private readonly elementRef = inject(ElementRef);
  private readonly roomsearch=inject(Roomsearch);
  // --- Fields shown in the bar ---
  readonly checkIn = signal<string>(''); // ISO date string ('' = unset)
  readonly checkOut = signal<string>('');
  readonly guests = signal<number | null>(null);
  constructor(
    private router: Router
  ) { }
  // TODO: the /rooms endpoint also filters by roomType and a price range,
  // which aren't represented as fields in this bar's current design yet.
  // Exposed as inputs for now so a parent can set them (or a future
  // "Filters" control can bind to them) without changing this component.

  readonly openPanel = signal<OpenPanel>(null);
  readonly isSearching = signal(false);
  readonly searchError = signal<string | null>(null);
  rooms : WritableSignal<roomsearchresponse[]>=signal<roomsearchresponse[]>([]);
  //@Output() readonly resultsFound = new EventEmitter<RoomSearchResult[]>();

  readonly checkInLabel = computed(() => this.checkIn() || 'Select Date');
  readonly checkOutLabel = computed(() => this.checkOut() || 'Select Date');
  readonly guestsLabel = computed(() => {
    const value = this.guests();
    if (value === null) return 'Select Guests';
    return value === 1 ? '1 Guest' : `${value} Guests`;
  });

  togglePanel(panel: Exclude<OpenPanel, null>): void {
    this.openPanel.set(this.openPanel() === panel ? null : panel);
  }

  closePanels(): void {
    this.openPanel.set(null);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closePanels();
    }
  }

  incrementGuests(): void {
    this.guests.update((value) => Math.min((value ?? 0) + 1, 5));
  }

  decrementGuests(): void {
    this.guests.update((value) => (value && value > 1 ? value - 1 : value));
  }

  onSearch(): void {
    this.closePanels();
    this.isSearching.set(true);
    this.searchError.set(null);

    this.roomsearch.getrooms(1,this.checkOut(),this.checkIn(),this.guests()).subscribe({
      next:(res)=>{
        console.log(res);
        this.router.navigate(['/roomsearch',this.checkOut(),this.checkIn(),this.guests()]);
        this.isSearching.set(false);
        this.rooms.set(res);
      }
      ,error:(err)=>{
        this.isSearching.set(false);
          this.searchError.set('Search failed. Please try again.');
      }
    })
    /*this.roomsSearchService
      .searchRooms({
        roomType: this.roomType,
        capacity: this.guests() ?? 1,
        minPrice: this.minPrice,
        maxPrice: this.maxPrice,
      })
      .subscribe({
        next: (rooms) => {
          this.isSearching.set(false);
          this.resultsFound.emit(rooms);
        },
        error: () => {
          this.isSearching.set(false);
          this.searchError.set('Search failed. Please try again.');
        },
      });*/
  }

/*
   onl:boolean=false;
  inl(){
    this.onl=!this.onl;
  }*/
}
