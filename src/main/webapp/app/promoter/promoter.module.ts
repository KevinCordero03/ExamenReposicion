import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventClientsComponent } from './event-clients/event-clients.component';
import { EventSalesComponent } from './event-sales/event-sales.component';
import { CommonModule } from '@angular/common';
import { EventUserComponent } from './event-user/event-user.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgChartsModule } from 'ng2-charts';
import { MatTableModule } from '@angular/material/table';

const routes: Routes = [
  { path: 'event-clients', component: EventClientsComponent },
  { path: 'event-sales', component: EventSalesComponent },
  { path: 'event-user', component: EventUserComponent },
];
@NgModule({
  declarations: [EventClientsComponent, EventSalesComponent, EventUserComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MatExpansionModule, NgChartsModule, MatTableModule],
})
export class PromoterModule {}
