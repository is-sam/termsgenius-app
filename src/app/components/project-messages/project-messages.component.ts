import { AfterViewChecked, AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../../interfaces/project';
import { ProjectMessage } from '../../../interfaces/project-message';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { SkeletonModule } from 'primeng/skeleton';
import { EditorModule } from 'primeng/editor';
import { ToastService } from '../../services/toast.service';
import { marked } from 'marked';

@Component({
  selector: 'app-project-messages',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, DividerModule, InputGroupModule, SkeletonModule, EditorModule],
  templateUrl: './project-messages.component.html',
  styleUrl: './project-messages.component.scss'
})
export class ProjectMessagesComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollTo') scrollTo: any;

  id: string|null;
  project: Project|null = null;
  messages: Array<ProjectMessage> = [];
  message: string = '';
  waitingAI: boolean = false;

  marked: any = marked;

  isScrolledToBottom: boolean = false;
  loadedMessages: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private toast: ToastService,
  ) {
    this.id = this.route.snapshot.paramMap.get('id')
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollPosition = window.pageYOffset + window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;

    // Only update the state if the condition changes
    const atBottom = scrollPosition >= pageHeight;
    if (this.isScrolledToBottom !== atBottom) {
      this.isScrolledToBottom = atBottom;
    }
  }

  ngOnInit() {
    console.log(this.id);
    this.projectService.getProject(Number(this.id)).subscribe((data: Project) => {
      console.log(data);
      this.project = data;
    });
    this.loadMessages();
  }

  ngAfterViewChecked() {
    if (this.loadedMessages) {
      this.loadedMessages = false;
      setTimeout(() => {
        this.scrollToBottom();
      }, 300);
    }
  }

  scrollToBottom() {
    this.scrollTo.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  loadMessages() {
    this.projectService.getMessages(Number(this.id)).subscribe((data: Array<ProjectMessage>) => {
      console.log(data);
      this.messages = data;
      this.loadedMessages = true;
    });
  }

  addMessage() {
    const message = this.message.trim();
    this.message = '';
    console.log('addMessage', message);
    this.messages.push({
      text: message,
      owner: 'user',
    });
    this.waitingAI = true;
    this.projectService.addMessage(Number(this.id), message).subscribe({
      next: (data: {message: ProjectMessage, response: ProjectMessage}) => {
        console.log(data);
        this.messages.push(data.response);
        this.loadMessages();
        this.waitingAI = false;
      },
      error: (error) => {
        console.log(error);
        this.toast.add({ severity: 'error', summary: 'Error adding message', detail: error.error.error });
        this.loadMessages();
        this.waitingAI = false;
      }
    });
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      this.addMessage();
    }
  }
}
