import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ClientsService } from '../../services/api-client/clients/clients.service';
import { IClientService } from '../../services/api-client/clients/iclients.service';
import { SERVICES_TOKEN } from '../../services/service.token';
import { ClientTableComponent } from "../components/client-table/client-table.component";
import { ClientModelTable } from '../clients.models';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { Subscription } from 'rxjs';
import { IsNackManagerService } from '../../services/isnackbar-manager.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-clients',
  imports: [ClientTableComponent],
  templateUrl: './list-clients.component.html',
  styleUrl: './list-clients.component.css',
  providers:[
      {provide: SERVICES_TOKEN.HTTP.CLIENT, useClass : ClientsService},
      {provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService}
    ]
})
export class ListClientsComponent implements OnInit, OnDestroy{

  private httpSubscriptions: Subscription[] = []
  clients: ClientModelTable[] = []

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.CLIENT) private readonly httpService: IClientService,
    @Inject(SERVICES_TOKEN.SNACKBAR) private readonly snackBarManager: IsNackManagerService,
    private readonly router: Router
  ) {}

  ngOnDestroy(): void {
    this.httpSubscriptions.forEach(s => s.unsubscribe())
  }

  ngOnInit(): void {
    this.httpSubscriptions.push(this.httpService.list().subscribe(data => this.clients = data))
  }

  atualizarClientes(client: ClientModelTable) {
      this.router.navigate(['clients/edit-client',client.id])
  }
  delete(client : ClientModelTable) {
    this.httpSubscriptions.push(
      this.httpService.delete(client.id).subscribe(_=>
        this.snackBarManager.show(`O cliente ${client.nome} foi excluido com sucesso!`))
    )
  }

}
