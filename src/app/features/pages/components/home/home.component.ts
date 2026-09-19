
import { Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  computed,
  inject,
   signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Mainhome } from "./component/mainhome/mainhome";
import { Offers } from "./component/offers/offers";


//import { RoomsSearchService } from './rooms-search.service';
//import { RoomSearchResult } from './room-search-result.model';




@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, Mainhome, Offers],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

}
