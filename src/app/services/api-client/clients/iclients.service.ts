import { Observable } from "rxjs";
import { DatailClientResponse, ListClientResponse, SaveClientRequest, SaveClientResponse, UpdateClientRequest, UpdateClientResponse } from "./client.models";

export interface IClientService {

  save(request: SaveClientRequest): Observable<SaveClientResponse>;

  update(id: number, request: UpdateClientRequest): Observable<UpdateClientResponse>;

  list(): Observable<ListClientResponse[]>;

  findById(id: number): Observable<DatailClientResponse>;

  delete(id: number): Observable<void>;
}
