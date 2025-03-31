import { Observable } from "rxjs";
import { SaveScheduleRequest, SaveScheduleResponse, ScheduleAppointmentMonthResponse } from "./schedule.models";


export interface IScheduleService{

  save(resquet: SaveScheduleRequest): Observable<SaveScheduleResponse>

  delete(id: number):Observable<void>

  listMonth(ano: number, mes:number): Observable<ScheduleAppointmentMonthResponse>

}
