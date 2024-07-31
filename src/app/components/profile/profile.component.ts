import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { User } from '../../../interfaces/user';
import { AuthService } from '../../auth/auth.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user: User|null = null;

  constructor(private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.profileService.loadData();
    this.profileService.getData().subscribe(data => {
      this.user = data;
    });
  }
}
