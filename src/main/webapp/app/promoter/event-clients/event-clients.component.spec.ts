import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventClientsComponent } from './event-clients.component';

describe('EventClientsComponent', () => {
  let component: EventClientsComponent;
  let fixture: ComponentFixture<EventClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventClientsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
