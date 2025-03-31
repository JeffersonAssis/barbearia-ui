import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { SaveScheduleRequest } from '../../services/api-client/schedules/schedule.models';
import { Agenda, SaveScheduleModel, ScheduleAppointementMonthModel, SelectClientModel } from '../schedule.models';
import { SERVICES_TOKEN } from '../../services/service.token';
import { Subscription } from 'rxjs';
import { ScheduleCalendarComponent } from '../components/schedule-calendar/schedule-calendar.component';
import { SchedulesService } from '../../services/api-client/schedules/schedules.service';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { ClientsService } from '../../services/api-client/clients/clients.service';
import { IScheduleService } from '../../services/api-client/schedules/ischedules.service';
import { IClientService } from '../../services/api-client/clients/iclients.service';
import { IsNackManagerService } from '../../services/isnackbar-manager.service';

@Component({
  selector: 'app-schedules-month',
  imports: [ScheduleCalendarComponent],
  templateUrl: './schedules-month.component.html',
  styleUrl: './schedules-month.component.css',
  providers:[
    {provide: SERVICES_TOKEN.HTTP.SCHEDULE, useClass: SchedulesService},
    {provide: SERVICES_TOKEN.HTTP.CLIENT, useClass: ClientsService},
    {provide : SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService}
  ]
})
export class SchedulesMonthComponent  implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = []
  private selectedDate?: Date

  monthSchedule!: ScheduleAppointementMonthModel
  clients: SelectClientModel[] = []

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.SCHEDULE) private readonly httpService: IScheduleService,
    @Inject(SERVICES_TOKEN.HTTP.CLIENT) private readonly clientHttpService: IClientService,
    @Inject(SERVICES_TOKEN.SNACKBAR) private readonly snackbarManage: IsNackManagerService
  ) { }

  ngOnInit(): void {
    this.fetchSchedules(new Date());
    this.subscriptions.push(this.clientHttpService.list().subscribe(data => this.clients = data))
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  onDateChange(date: Date) {
    this.selectedDate = date
    this.fetchSchedules(date)
  }

  onConfirmDelete(schedule: Agenda) {
    this.subscriptions.push(this.httpService.delete(schedule.id).subscribe(() => {
      console.log(`Id para excluir o agendamento ${schedule.id}`)
      this.snackbarManage.show('Agendamento excluído com sucesso');
      if (this.selectedDate) {
        this.fetchSchedules(this.selectedDate);
      }
    }));
  }

  onScheduleClient(schedule: SaveScheduleModel) {

    if (schedule.inicio && schedule.fim && schedule.clienteId) {
      const request: SaveScheduleRequest = { inicio: schedule.inicio, fim: schedule.fim, clienteId : schedule.clienteId }

      console.log(` Id - cliente = ${request.clienteId} - ${request.inicio} até ${request.fim}`)
      this.subscriptions.push(this.httpService.save(request).subscribe(() => {
        this.snackbarManage.show('Agendamento realizado com sucesso')
        if (this.selectedDate) {
          this.fetchSchedules(this.selectedDate)
        }
      }))
    }
  }

  private fetchSchedules(currentDate: Date) {
    const ano = currentDate.getFullYear();
    const mes = currentDate.getMonth() + 1;
    this.subscriptions.push(this.httpService.listMonth(ano, mes).subscribe(data => this.monthSchedule = data));
  }

  private formatDateISO(date: Date): string {
    return date.toISOString();
  }

}
