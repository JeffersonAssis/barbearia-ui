import { Component, Inject, OnDestroy } from '@angular/core';
import { SERVICES_TOKEN } from '../../services/service.token';
import { IClientService } from '../../services/api-client/clients/iclients.service';
import { ClientsService } from '../../services/api-client/clients/clients.service';
import { ClientFormComponent } from "../components/client-form/client-form.component";
import { ClientModelForm } from '../clients.models';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { IsNackManagerService } from '../../services/isnackbar-manager.service';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';

@Component({
  selector: 'app-new-client',
  imports: [ClientFormComponent],
  templateUrl: './new-client.component.html',
  styleUrl: './new-client.component.css',
  providers:[
    {provide : SERVICES_TOKEN.HTTP.CLIENT, useClass : ClientsService},
    {provide : SERVICES_TOKEN.SNACKBAR, useClass : SnackbarManagerService}
  ]
})
export class NewClientComponent implements OnDestroy{

  private httpSubScription?: Subscription

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.CLIENT)private readonly htttpService: IClientService,
    @Inject(SERVICES_TOKEN.SNACKBAR) private readonly snackBarManager:IsNackManagerService,
    private readonly router: Router){}


  ngOnDestroy(): void {
    if(this.httpSubScription){
      this.httpSubScription.unsubscribe()
    }
  }

  clinetSubmit( value: ClientModelForm) {
    const {id, ...request}  = value
    this.htttpService.save(request).subscribe(_ =>{
      this.snackBarManager.show(`Usuário Cadastrado`)
      this.router.navigate(['clients/list'])
    })
  }
}
