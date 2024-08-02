import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToggleButtonModule } from 'primeng/togglebutton';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ToggleButtonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  darkMode = false;

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    // localStorage.setItem('darkmode', this.darkMode.toString());
    // console.log('Dark mode toggled', this.darkMode);
  }
}
