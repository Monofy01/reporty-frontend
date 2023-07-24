import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Menu} from "../interfaces/menu";
import {Reporte} from "../interfaces/reporte";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {FileSigned} from "../interfaces/file";

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor(private http: HttpClient) { }

  getReportes(): Observable<Reporte[]> {
    return this.http.get<Reporte[]>(environment.url_lambda.dev + 'get_all');
  }

  downloadFile(file_name: string): Observable<FileSigned> {
    return this.http.post<FileSigned>(environment.url_lambda.dev + 'download_file', { file_name });
  }
}
