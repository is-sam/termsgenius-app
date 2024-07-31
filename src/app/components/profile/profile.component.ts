import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { User } from '../../../interfaces/user';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user!: User;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.getData();
  }
}
