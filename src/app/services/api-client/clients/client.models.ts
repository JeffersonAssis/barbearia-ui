export interface SaveClientRequest {

  nome: string;
  email: string;
  telefone: string;

}

export interface UpdateClientRequest {

  nome: string;
  email: string;
  telefone: string;

}

export interface SaveClientResponse {
  id : number;
  nome: string;
  email: string;
  telefone: string;

}

export interface UpdateClientResponse {
  id : number;
  nome: string;
  email: string;
  telefone: string;

}

export interface ListClientResponse {
  id : number;
  nome: string;
  email: string;
  telefone: string;

}

export interface DatailClientResponse {
  id : number;
  nome: string;
  email: string;
  telefone: string;
}
