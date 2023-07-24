import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {Reporte} from "../../../interfaces/reporte";
import {MatTableDataSource} from "@angular/material/table";
import {ReporteService} from "../../../services/reporte.service";
import * as FileSaver from 'file-saver';
import {FileSigned} from "../../../interfaces/file";
import {ReporteMetadata} from "../../../interfaces/reporte_metadata";


@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  constructor(private _reporteService: ReporteService) {
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator) paginatorMeta!: MatPaginator;


  listaReportes: Reporte[] = []
  listaReportesEstatus: ReporteMetadata[] = []


  displayedColumns: string[] = ['id', 'xlsx', 'log', 'zip', 'user_owner', 'created_at'];
  // displayedColumnsMetadata: string[] = ['id', 'created_at', 'name', 'status', 'users_allowed'];
  displayedColumnsMetadata: string[] = ['id', 'name', 'created_at', 'user_owner', 'status', 'users_allowed'];
  dataSource = new MatTableDataSource<Reporte>(this.listaReportes)
  dataSourceMeta = new MatTableDataSource<ReporteMetadata>(this.listaReportesEstatus)

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSourceMeta.paginator = this.paginatorMeta;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this._reporteService.getReportes().subscribe((data: Reporte[]) => {
      this.listaReportes = data;
      this.dataSource = new MatTableDataSource<Reporte>(this.listaReportes);
      this.dataSource.paginator = this.paginator;
    });

    this._reporteService.getReportesMeta().subscribe((data: ReporteMetadata[]) => {
      this.listaReportesEstatus = data;
      this.dataSourceMeta = new MatTableDataSource<ReporteMetadata>(this.listaReportesEstatus);
      this.dataSource.paginator = this.paginator;
    });


  }

  downloadFile(file_name: string) {
    this._reporteService.downloadFile(file_name).subscribe(
      (response: FileSigned) => {
        const downloadUrl = response.url_firmada;
        fetch(downloadUrl)
          .then(res => res.blob())
          .then((blob) => {
            FileSaver.saveAs(blob, file_name);
          })
      },
      (error: any) => {
        console.error('Error downloading file:', error);
      }
    );
  }

  applyFilterMeta(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
