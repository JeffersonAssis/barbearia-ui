import { ComponentType } from "@angular/cdk/overlay";
import { Observable } from "rxjs";
import { YesNoDialogComponent } from "../commons/components/yes-no-dialog/yes-no-dialog.component";

export interface IDiologManagerService{
  showYesNoDialog(component : ComponentType<YesNoDialogComponent>, data:{title:string, content:string}):Observable<any>
}
