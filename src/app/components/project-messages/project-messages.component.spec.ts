import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMessagesComponent } from './project-messages.component';

describe('ProjectMessagesComponent', () => {
  let component: ProjectMessagesComponent;
  let fixture: ComponentFixture<ProjectMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectMessagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
