import { AfterViewInit, Component, EventEmitter, Inject, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Subscription } from 'rxjs';
import { FormControl, FormsModule, NgForm } from '@angular/forms';
import { SERVICES_TOKEN } from '../../../services/service.token';
import { Agenda, SaveScheduleModel, ScheduleAppointementMonthModel, SelectClientModel } from '../../schedule.models';
import { YesNoDialogComponent } from '../../../commons/components/yes-no-dialog/yes-no-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DialogManagerService } from '../../../services/dialog-manager.service';
import { IDiologManagerService } from '../../../services/idialog-manager.service';
import { CustomPaginator } from '../../../clients/components/client-table/custom-paginator';


@Component({
  selector: 'app-schedule-calendar',
  imports: [
    CommonModule,
    MatTimepickerModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatTooltipModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    FormsModule
  ],
  templateUrl: './schedule-calendar.component.html',
  styleUrl: './schedule-calendar.component.css',
  providers:[
    {provide:SERVICES_TOKEN.YES_NO_DIALOG, useClass:DialogManagerService },
    { provide: MatPaginatorIntl, useClass: CustomPaginator }
  ]
})
export class ScheduleCalendarComponent implements OnDestroy, OnChanges, AfterViewInit {
  private subscription?: Subscription

  private _selected: Date = new Date();

  displayedColumns: string[] = ['inicio', 'fim', 'clients', 'actions'];

  dataSource!: MatTableDataSource<Agenda>

  addingSchedule: boolean = false

  newSchedule: SaveScheduleModel = { inicio: undefined, fim: undefined, clienteId: undefined }

  clientSelectFormControl = new FormControl()

  @Input() monthSchedule: ScheduleAppointementMonthModel= { agenda: [], ano: 0, mes:0  }
  @Input() clients: SelectClientModel[] = []

  @Output() onDateChange = new EventEmitter<Date>()
  @Output() onConfirmDelete = new EventEmitter<Agenda>()
  @Output() onScheduleClient = new EventEmitter<SaveScheduleModel>()

  @ViewChild(MatPaginator) paginator!: MatPaginator

  constructor(@Inject(SERVICES_TOKEN.YES_NO_DIALOG) private readonly dialogManagerService :IDiologManagerService) { }

  get selected(): Date {
    return this._selected
  }

  set selected(selected: Date) {
    if (this._selected.getTime() !== selected.getTime()) {
      this.onDateChange.emit(selected)
      this.buildTable()
      this._selected = selected
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  ngAfterViewInit(): void {
    if (this.dataSource && this.paginator) {
      this.dataSource.paginator = this.paginator
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['monthSchedule'] && this.monthSchedule?.agenda) {
      this.buildTable()
    }
  }

  onSubmit(form: NgForm) {
    const inicio = new Date(this._selected);
    const fim = new Date(this._selected);
    inicio.setHours(this.newSchedule.inicio!.getHours(), this.newSchedule.inicio!.getMinutes());
    fim.setHours(this.newSchedule.fim!.getHours(), this.newSchedule.fim!.getMinutes());

    const saved: Agenda = {
      id: -1,
      dia: this._selected.getDate(),
      inicio,
      fim,
      clienteId: this.newSchedule.clienteId!,
      clienteNome: this.clients.find(c => c.id === this.newSchedule.clienteId!)!.nome,
    };

    if (!this.monthSchedule.agenda) {
    this.monthSchedule.agenda = [];
    }

    this.monthSchedule.agenda.push(saved);
    this.onScheduleClient.emit(saved);

    this.buildTable();
    form.resetForm();
    this.newSchedule = { inicio: undefined, fim: undefined, clienteId: undefined };


  }


  requestDelete(schedule: Agenda) {
    this.subscription = this.dialogManagerService.showYesNoDialog(
      YesNoDialogComponent,
      { title: 'Exclusão de agendamento', content: 'Confirma a exclusão do agendamento?' }
    ).subscribe((result: any) => {
      if (result) {
        console.log(`E o Segundo console ${schedule.id}`)
        this.onConfirmDelete.emit(schedule)
        const updatedeList = this.dataSource.data.filter(c => c.id !== schedule.id)
        this.dataSource = new MatTableDataSource<Agenda>(updatedeList)
        if (this.paginator) {
          this.dataSource.paginator = this.paginator
        }
      }
    })
  }

  onTimeChange(time: Date) {
    const parsedTime = typeof time === "string" ? new Date(`1970-01-01T${time}:00`) : new Date(time);
    parsedTime.setHours(parsedTime.getHours() + 1);
    console.log(parsedTime)
    this.newSchedule.fim = parsedTime;
  }

  private buildTable() {
    if (!this.monthSchedule || !this.monthSchedule.agenda) {
      console.error("Erro: monthSchedule ou agenda está indefinido.");
      return;
    }

    const appointments = this.monthSchedule.agenda.filter(a => {

      return (
        this.monthSchedule.ano === this._selected.getFullYear() &&
        this.monthSchedule.mes - 1 === this._selected.getMonth() &&
        a.dia === this._selected.getDate()
      );
    });

    this.dataSource = new MatTableDataSource<Agenda>(appointments);

    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }

}
}
