import { Injectable } from '@angular/core';
import { IsNackManagerService } from './isnackbar-manager.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarManagerService implements IsNackManagerService{

  constructor(private readonly snackBar : MatSnackBar) { }


  show(message: string, action: string ='Fechar', duration: number = 3000): void {
    this.snackBar.open(message, action, {duration, verticalPosition: 'top', horizontalPosition:"right"})
  }
}
