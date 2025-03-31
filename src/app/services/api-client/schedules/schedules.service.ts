import { Injectable } from '@angular/core';
import { IScheduleService } from './ischedules.service';
import { Observable } from 'rxjs';
import { SaveScheduleRequest, SaveScheduleResponse, ScheduleAppointmentMonthResponse } from './schedule.models';
import { environment } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SchedulesService  implements IScheduleService{

  private readonly baseUrl = environment.apiUrl;

  constructor(private http : HttpClient) { }



  save(resquet: SaveScheduleRequest): Observable<SaveScheduleResponse> {
    return this.http.post<SaveScheduleResponse>(`${this.baseUrl}agenda`,resquet)
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}agenda/${id}`)
  }
  listMonth(ano: number, mes: number): Observable<ScheduleAppointmentMonthResponse> {
    return this.http.get<ScheduleAppointmentMonthResponse>(`${this.baseUrl}agenda/${ano}/${mes}`)
  }
}
