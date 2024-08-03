import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { User } from '../../../interfaces/user';
import { ProfileService } from '../../services/profile.service';
import { AbstractControlOptions, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ToastService } from '../../services/toast.service';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ButtonModule, FormsModule, ReactiveFormsModule, DialogModule, InputTextModule, SkeletonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user!: User;
  editFirstname: boolean = false;
  editLastname: boolean = false;

  changePasswordModal: boolean = false;
  signupForm: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    repeatPassword: new FormControl('', [Validators.required])
  }, {
    validators: [this.checkPasswords]
  } as AbstractControlOptions);

  constructor(
    private profileService: ProfileService,
    private toast: ToastService,
  ) {}

  ngOnInit() {
    this.profileService.loadData();
    this.profileService.getData().subscribe(data => {
      this.user = data;
    });
  }

  saveFirstName() {
    console.log('saveFirstName', this.user?.firstname);
    this.profileService.update({firstname: this.user.firstname}).subscribe();
    this.editFirstname = false;
  }

  saveLastName() {
    console.log('saveLastName', this.user?.lastname);
    this.profileService.update({lastname: this.user.lastname}).subscribe();
    this.editLastname = false;
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('repeatPassword')?.value;
    return password === confirmPassword ? null : { notSame: true };
  }

  get passwordControl() {
    return this.signupForm.get('password');
  }

  get repeatPasswordControl() {
    return this.signupForm.get('repeatPassword');
  }

  savePassword() {
    if (!this.signupForm.valid) {
      console.error('Form is invalid');
      return;
    }

    this.profileService
      .changePassword(this.signupForm.value.password, this.signupForm.value.repeatPassword)
      .subscribe(() => {
        this.toast.add({severity: 'success', summary: 'Password updated', detail: 'Your password has been updated'});
      });
    this.changePasswordModal = false;
  }
}
