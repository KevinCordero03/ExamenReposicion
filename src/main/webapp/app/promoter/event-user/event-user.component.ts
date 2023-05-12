import { Component, OnInit } from '@angular/core';
import { IEvent } from '../../entities/event/event.model';
import { EventUserService } from '../service/event-user.service';
import { EventService } from '../../entities/event/service/event.service';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'jhi-event-user',
  templateUrl: './event-user.component.html',
  styleUrls: ['./event-user.component.scss'],
})
export class EventUserComponent implements OnInit {
  events?: IEvent[];

  constructor(
    protected eventUserService: EventUserService,
    protected eventService: EventService,
    protected matExpansionModule: MatExpansionModule
  ) {}

  ngOnInit(): void {
    this.eventService.myQuery().subscribe(res => {
      this.events = <IEvent[]>(<unknown>res.body);
      this.events?.forEach(event => {
        this.eventUserService.findEventUsers(event.id.toString()).subscribe(res => {
          event.clients = res;
          console.log(res);
        });
      });
    });
  }

  showClients(): void {
    console.log(this.events);
  }
}
