import { Injectable } from '@angular/core';
import { IClientService } from './iclients.service';
import { Observable } from 'rxjs';
import { SaveClientRequest, SaveClientResponse, UpdateClientRequest, UpdateClientResponse, ListClientResponse, DatailClientResponse } from './client.models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ClientsService implements IClientService {

  private readonly baseUrl = environment.apiUrl;

  constructor(private http : HttpClient) { }

  save(request: SaveClientRequest): Observable<SaveClientResponse> {
    return this.http.post<SaveClientResponse>(`${this.baseUrl}cliente`, request);
  }
  update(id: number, request: UpdateClientRequest): Observable<UpdateClientResponse> {
    return this.http.put<SaveClientResponse>(`${this.baseUrl}cliente/${id}`, request);
  }
  list(): Observable<ListClientResponse[]> {
    return this.http.get<ListClientResponse[]>(`${this.baseUrl}cliente`);
  }
  findById(id: number): Observable<DatailClientResponse> {
    return this.http.get<DatailClientResponse>(`${this.baseUrl}cliente/${id}`);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}cliente/${id}`);
  }
}
