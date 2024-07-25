import { Component, OnInit, Signal, signal, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { StyleClassModule } from 'primeng/styleclass';
import { AuthService } from '../../auth/auth.service';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarModule, ButtonModule, AvatarModule, StyleClassModule, RouterLink, RouterLinkActive, MenuModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  userEmail = signal('');
  profileMenuVisible = false;
  items: Array<MenuItem> = [
    { label: 'Profile', icon: 'pi pi-fw pi-user', routerLink: '/profile' },
    { label: 'Sign Out', icon: 'pi pi-fw pi-sign-out', routerLink: '/sign-out' },
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const data = this.authService.getData();
    this.userEmail.set(data?.email ?? 'Not Found');
  }
}
