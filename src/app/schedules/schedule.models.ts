export interface ScheduleAppointementMonthModel {
  ano: number
  mes: number
  agenda: Agenda[]
}

export interface Agenda {
  id: number
  dia: number
  inicio: Date
  fim: Date
  clienteId?: number
  clienteNome: string
}

export interface SaveScheduleModel {
  inicio?: Date
  fim?: Date
  clienteId?: number
}

export interface SelectClientModel {
    id: number;
    nome: string;
}





