import { AfterViewInit, Component, EventEmitter, Inject, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ClientModelTable } from '../../clients.models';
import { Subscription } from 'rxjs';
import { SERVICES_TOKEN } from '../../../services/service.token';
import { IDiologManagerService } from '../../../services/idialog-manager.service';
import { DialogManagerService } from '../../../services/dialog-manager.service';
import { YesNoDialogComponent } from '../../../commons/components/yes-no-dialog/yes-no-dialog.component';
import { CustomPaginator } from './custom-paginator';

@Component({
  selector: 'app-client-table',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
  ],
  templateUrl: './client-table.component.html',
  styleUrl: './client-table.component.css',
  providers:[
    {provide : SERVICES_TOKEN.YES_NO_DIALOG, useClass: DialogManagerService },
    { provide: MatPaginatorIntl, useClass: CustomPaginator }
  ]
})
export class ClientTableComponent implements AfterViewInit, OnChanges, OnDestroy {

    @Input() clients: ClientModelTable[]=[]

    dataSource!:MatTableDataSource<ClientModelTable>

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    displayedColumns: string[] = ['nome','email','telefone','actions']

    private dialgManagerServiceSubscriptions?:  Subscription

    @Output() confrimeDelete = new EventEmitter<ClientModelTable>()

    @Output() requestUpdate = new EventEmitter<ClientModelTable>()

    constructor(
      @Inject(SERVICES_TOKEN.YES_NO_DIALOG) private readonly dialogManagerService: IDiologManagerService
     ){}

  ngOnDestroy(): void {
    if(this.dialgManagerServiceSubscriptions){
      this.dialgManagerServiceSubscriptions.unsubscribe()
     }
  }
  ngOnChanges(changes: SimpleChanges): void {
   if(changes['clients'] && this.clients){
      this.dataSource = new MatTableDataSource<ClientModelTable>(this.clients)
      if(this.paginator){
        this.dataSource.paginator=this.paginator
      }
   }
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  formatTelefone(telefone:string){
    return `(${telefone.substring(0,2)}) ${telefone.substring(2,3)} ${telefone.substring(3,7)} - ${telefone.substring(7)}`
  }

  atualizarCliente(client: ClientModelTable) {
    this.requestUpdate.emit(client)
  }

  detele(client: ClientModelTable) {
    this.dialogManagerService.showYesNoDialog(
      YesNoDialogComponent,
      { title: 'Exclusão de cliente', content: `Confirma a exclusão do cliente ${client.nome}` }
    )
      .subscribe(result => {
        if (result) {
          this.confrimeDelete.emit(client)
          const updatedList = this.dataSource.data.filter(c => c.id !== client.id)
          this.dataSource = new MatTableDataSource<ClientModelTable>(updatedList)
        }
      })
  }
}
