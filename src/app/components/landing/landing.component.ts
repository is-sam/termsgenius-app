import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    AccordionModule,
    InputTextModule,
    ButtonModule,
    MenubarModule,
    SelectButtonModule,
    BadgeModule,
    DividerModule,
    InputGroupModule,
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {
  @ViewChild('email') email: InputTextModule = new InputTextModule();
  isMenuActive: boolean = false;

  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
  }
}
