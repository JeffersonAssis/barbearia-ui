import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgxMaskDirective } from 'ngx-mask';
import { ClientModelForm } from '../../clients.models';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-client-form',
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    NgxMaskDirective
  ],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.css'
})
export class ClientFormComponent {

  @Input() client:ClientModelForm = {id: 0 , nome:'', email:'', telefone:''}

  @Output() clinetSubmit = new EventEmitter<ClientModelForm>();

  onSubmit(_: NgForm) {
    this.clinetSubmit.emit(this.client)
  }

}
