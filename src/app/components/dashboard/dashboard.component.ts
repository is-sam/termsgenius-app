import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SkeletonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  constructor(public dashboardService: DashboardService) {}

  ngOnInit() {
    console.log('Dashboard loaded');
    this.dashboardService.loadData();
  }
}
