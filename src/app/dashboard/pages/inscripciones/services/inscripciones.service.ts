import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InscripcionWithAll } from '../models';
import { enviroment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {

  constructor(private httpClient: HttpClient) { }

  getAllInscripciones(): Observable<InscripcionWithAll[]> {
    return this.httpClient.get<InscripcionWithAll[]>(`${enviroment.apiBaseUrl}/inscriptions?_expand=course&_expand=student&_expand=subject`)
  }

  deleteInscripcionById(id: number): Observable<unknown> {
    return this.httpClient.delete(`${enviroment.apiBaseUrl}/inscriptions/${id}`);
  }
}