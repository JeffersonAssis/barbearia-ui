
import { Routes } from '@angular/router';
import { EditClientComponent } from './clients/edit-client/edit-client.component';
import { NewClientComponent } from './clients/new-client/new-client.component';
import { ListClientsComponent } from './clients/list-clients/list-clients.component';
import { SchedulesMonthComponent } from './schedules/schedules-month/schedules-month.component';

export const routes: Routes = [
  {path:'clients/edit-client/:id', component: EditClientComponent , data:{title:'Atualizar Cadastro'}},
  {path:'clients/new-client', component: NewClientComponent , data:{title:'Cadatra Cliente'}},
  {path:'clients/list', component: ListClientsComponent, data:{title:'Listagem de Clientes'}},
  {path:'schedules/month', component: SchedulesMonthComponent, data:{title:'Agendamento'}},
  {path:'**', redirectTo:'schedules/month'}
];
