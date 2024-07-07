import { Component, OnInit, ViewChild } from '@angular/core';
import { Project } from '../../../interfaces/project';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProjectService } from '../../services/project.service';
import { InputTextModule } from 'primeng/inputtext';
import { take } from 'rxjs';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { EditorModule } from 'primeng/editor';
import { ProjectModalComponent } from '../project-modal/project-modal.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    InputTextareaModule,
    ToastModule,
    ToolbarModule,
    ButtonModule,
    TableModule,
    CurrencyPipe,
    RatingModule,
    TagModule,
    DialogModule,
    DropdownModule,
    RadioButtonModule,
    ConfirmDialogModule,
    ProjectModalComponent,
  ],
  providers: [MessageService, ConfirmationService, ProjectService],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit {
  @ViewChild(Table) table!: Table;

  project!: Project;

  selectedProjects!: Project[] | null;

  statuses!: any[];

  projectDialogVisible: boolean = false;

  constructor(
    public projectService: ProjectService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.projectService.loadProjects();
  }

  openNew() {
    this.project = {};
    this.projectDialogVisible = true;
  }

  editProject(project: Project) {
    this.project = { ...project };
    this.projectDialogVisible = true;
  }

  deleteProject(project: Project) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + project.title + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // TODO: implement delete project
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Project Deleted',
          life: 3000,
        });
      },
    });
  }

  search (event: Event) {
    const value = (<HTMLInputElement>event.target).value;
    this.table.filterGlobal(value, 'contains');
  }
}
