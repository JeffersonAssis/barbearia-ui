export interface ScheduleAppointmentMonthResponse {
  ano: number
  mes: number
  agenda: Agenda []
}

export interface Agenda {
  id: number
  dia: number
  inicio: Date
  fim: Date
  cleinteId: number
  clienteNome: string
}

export interface SaveScheduleResponse {
  id: number
  inicio: Date
  fim: Date
  clienteid: number
}

export interface SaveScheduleRequest {
  inicio: Date
  fim: Date
  clienteId: number
}
