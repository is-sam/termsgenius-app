import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { formatDistance } from "date-fns";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SkeletonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  data$ = this.dashboardService.data$;

  constructor(public dashboardService: DashboardService) {}

  ngOnInit() {
    console.log('Dashboard loaded');
    this.dashboardService.loadData();
  }

  humanizeSeconds(seconds: number) {
    return formatDistance(0, seconds * 1000, { includeSeconds: true });
  }
}
