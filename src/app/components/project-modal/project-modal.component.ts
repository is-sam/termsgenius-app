import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Project } from '../../../interfaces/project';
import { EditorModule } from 'primeng/editor';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ProjectService } from '../../services/project.service';
import { ToastService } from '../../services/toast.service';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, DialogModule, ButtonModule, InputTextModule, EditorModule, SkeletonModule],
  templateUrl: './project-modal.component.html',
  styleUrl: './project-modal.component.scss'
})
export class ProjectModalComponent implements OnInit {
  @Input() project!: Project;
  @Output() onHideDialog: EventEmitter<void> = new EventEmitter();

  visible: boolean = true;
  submitted: boolean = false;
  loaded: boolean = false;

  constructor(private projectService: ProjectService, private message: ToastService) {}

  ngOnInit() {
    console.log('Project before:', this.project);

    if (!this.project?.id) {
      this.loaded = true;
      return;
    }

    this.projectService.getProject(Number(this.project.id)).subscribe({
      next: (project: Project) => {
        console.log('Project loaded:', project);
        this.project = project;
      }, error: (error) => {
        console.log('Error loading project:', error);
      }, complete: () => {
        this.loaded = true;
      }
    });
  }

  hideDialog() {
    console.log('Hiding dialog...');
    this.onHideDialog.emit();
  }

  saveProject() {
    const isNew = !this.project.id;
    console.log('Saving project...', isNew, this.project);

    if (isNew) {
      this.projectService.saveProject({
        title: this.project.title,
        content: this.project.content,
      }).subscribe({
        next: (project: Project) => {
          console.log('Project save success:', project);
          this.message.add({ severity: 'success', summary: 'Success', detail: 'Project saved!' });
          this.projectService.loadProjects();
          this.hideDialog();
        },
        error: (error) => {
          this.message.add({ severity: 'error', summary: 'Error', detail: 'Error saving project' });
          console.error('Error saving project:', error);
        }
      });
      return;
    }

    this.projectService.updateProject({
      id: this.project.id,
      title: this.project.title,
      content: this.project.content,
    }).subscribe({
      next: (project: Project) => {
        console.log('Project update success:', project);
        this.message.add({ severity: 'success', summary: 'Success', detail: 'Project updated!' });
        this.projectService.loadProjects();
        this.hideDialog();
      },
      error: (error) => {
        this.message.add({ severity: 'error', summary: 'Error', detail: 'Error updating project' });
        console.error('Error updating project:', error);
      }
    });
  }
}
