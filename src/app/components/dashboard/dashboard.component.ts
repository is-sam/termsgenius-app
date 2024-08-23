import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import moment from 'moment';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SkeletonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  moment: any = moment;
  data$ = this.dashboardService.data$;

  constructor(public dashboardService: DashboardService) {}

  ngOnInit() {
    console.log('Dashboard loaded');
    this.dashboardService.loadData();
  }
}
