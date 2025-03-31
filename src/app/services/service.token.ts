import { InjectionToken } from "@angular/core";
import { IClientService } from "./api-client/clients/iclients.service";
import { IsNackManagerService } from "./isnackbar-manager.service";
import { IDiologManagerService } from "./idialog-manager.service";
import { IScheduleService } from "./api-client/schedules/ischedules.service";

export const SERVICES_TOKEN ={
  HTTP:{
    CLIENT: new InjectionToken<IClientService>('SERVICES_TOKEN.HTTP.CLIENT'),
    SCHEDULE: new InjectionToken<IScheduleService>('SERVICES_TOKEN.HTTP.SCHEDULE'),

  },
  SNACKBAR: new InjectionToken<IsNackManagerService>('SERVICES_TOKEN.SNACKBAR'),
  YES_NO_DIALOG: new InjectionToken<IDiologManagerService>('SERVICES_TOKEN.YES_NO_DIALOG')

}
