import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  isSidebarInactive = true;

  toggleSidebar(event: Event) {
    event.preventDefault(); // Prevenir la acción por defecto del enlace
    this.isSidebarInactive = !this.isSidebarInactive;
  }
}
