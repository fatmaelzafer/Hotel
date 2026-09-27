import { Component, signal } from '@angular/core';
import { ɵEmptyOutletComponent, RouterOutlet, Router } from '@angular/router';
import { FlowbiteService } from './core/services/flowbitSevice/flowbite.service';
import { initFlowbite } from 'flowbite';








@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Hotel');
  constructor(private flowbiteService: FlowbiteService) {
  }

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

}
