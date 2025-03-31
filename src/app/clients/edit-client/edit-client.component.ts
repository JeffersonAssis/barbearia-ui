import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { SERVICES_TOKEN } from '../../services/service.token';
import { ClientsService } from '../../services/api-client/clients/clients.service';
import { IClientService } from '../../services/api-client/clients/iclients.service';
import { ClientFormComponent } from "../components/client-form/client-form.component";
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { IsNackManagerService } from '../../services/isnackbar-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClientModelForm } from '../clients.models';


@Component({
  selector: 'app-edit-client',
  imports: [ClientFormComponent],
  templateUrl: './edit-client.component.html',
  styleUrl: './edit-client.component.css',
  providers:[
      {provide : SERVICES_TOKEN.HTTP.CLIENT, useClass : ClientsService},
      {provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService}
    ]
})
export class EditClientComponent implements OnInit, OnDestroy{

  private httpSubScription?: Subscription[] =[];

  client:ClientModelForm = {id:0 , nome:'', email:'', telefone:''}

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.CLIENT) private readonly httpService: IClientService,
    @Inject(SERVICES_TOKEN.SNACKBAR) private readonly snackBarManager: IsNackManagerService,
    private readonly activeRoute : ActivatedRoute,
    private readonly router : Router
  ) {}
  ngOnDestroy(): void {
    if(this.httpSubScription){
      this.httpSubScription.forEach(s=> s.unsubscribe())
    }
  }
  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('id')
    if(!id){
      this.snackBarManager.show('Erro ao recuperar o resgistro')
      this.router.navigate(['clients/list'])
      return
    }
    this.httpSubScription?.push(this.httpService.findById(Number(id)).subscribe(data => this.client = data))
  }

  clinetSubmit(value:ClientModelForm){
    const {id, ...resquet} = value
    if(id){
      this.httpSubScription?.push(this.httpService.update(id, resquet).subscribe(_ =>{
        this.router.navigate(['clients/list'])
        this.snackBarManager.show('Registro atulizado com sucesso!')
      }))
      return
    }
    this.router.navigate(['clients/list'])
    this.snackBarManager.show('Erro ao tentar atualizar o registro!')
  }

}
