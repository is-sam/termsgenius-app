import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CardModule,
    AccordionModule,
    InputTextModule,
    ButtonModule,
    MenubarModule,
    SelectButtonModule,
    BadgeModule,
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {}
