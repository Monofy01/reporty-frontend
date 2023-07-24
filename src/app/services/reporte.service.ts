import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Menu} from "../interfaces/menu";
import {Reporte} from "../interfaces/reporte";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {FileSigned} from "../interfaces/file";
import {ReporteMetadata} from "../interfaces/reporte_metadata";

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor(private http: HttpClient) { }

  getReportes(): Observable<Reporte[]> {
    const reporte = {
      metadata: false,
      reports: true
    }
    return this.http.post<Reporte[]>(environment.url_lambda.dev + 'get_all', reporte);
  }

  getReportesMeta(): Observable<ReporteMetadata[]> {
    const meta = {
      metadata: true,
      reports: false
    }
    return this.http.post<ReporteMetadata[]>(environment.url_lambda.dev + 'get_all', meta);
  }

  downloadFile(file_name: string): Observable<FileSigned> {
    return this.http.post<FileSigned>(environment.url_lambda.dev + 'download_file', { file_name });
  }
}
