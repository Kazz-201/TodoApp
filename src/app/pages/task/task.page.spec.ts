import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskPage } from './task.page';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { RouterTestingModule } from '@angular/router/testing';

describe('TaskPage', () => {
  let component: TaskPage;
  let fixture: ComponentFixture<TaskPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskPage, RouterTestingModule],
      providers: [provideIonicAngular()]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
