import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {Reporte} from "../../../interfaces/reporte";
import {MatTableDataSource} from "@angular/material/table";
import {ReporteService} from "../../../services/reporte.service";
import * as FileSaver from 'file-saver';
import {FileSigned} from "../../../interfaces/file";


@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  constructor(private _reporteService: ReporteService) {
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // listaReportes: Reporte[] = [
  //   {id: '1', file_xlsx: 'reporte-1/reporte-1.xlsx', file_log: 'reporte-1/reporte-1-logs.txt', file_json: 'reporte-1/reporte-1-logs.json', user_owner: 'bri_riva1@hotmail.com', created_at: '2023-07-23T20:22:49.442090+00:00'},
  //   {id: '2', file_xlsx: 'reporte-2/reporte-2.xlsx', file_log: 'reporte-2/reporte-2-logs.txt', file_json: 'reporte-2/reporte-2-logs.json', user_owner: 'bri_riva2@hotmail.com', created_at: '2023-07-23T20:22:49.442090+00:00'},
  //   {id: '3', file_xlsx: 'reporte-3/reporte-3.xlsx', file_log: 'reporte-3/reporte-3-logs.txt', file_json: 'reporte-3/reporte-3-logs.json', user_owner: 'bri_riva3@hotmail.com', created_at: '2023-07-23T20:22:49.442090+00:00'},
  //   {id: '4', file_xlsx: 'reporte-4/reporte-4.xlsx', file_log: 'reporte-4/reporte-4-logs.txt', file_json: 'reporte-4/reporte-4-logs.json', user_owner: 'bri_riva4@hotmail.com', created_at: '2023-07-23T20:22:49.442090+00:00'},
  //   {id: '5', file_xlsx: 'reporte-5/reporte-5.xlsx', file_log: 'reporte-5/reporte-5-logs.txt', file_json: 'reporte-5/reporte-5-logs.json', user_owner: 'bri_riva5@hotmail.com', created_at: '2023-07-23T20:22:49.442090+00:00'},
  //   {id: '6', file_xlsx: 'reporte-6/reporte-6.xlsx', file_log: 'reporte-6/reporte-6-logs.txt', file_json: 'reporte-6/reporte-6-logs.json', user_owner: 'bri_riva6@hotmail.com', created_at: '2023-07-23T20:22:49.442090+00:00'},
  //   {id: '7', file_xlsx: 'reporte-7/reporte-7.xlsx', file_log: 'reporte-7/reporte-7-logs.txt', file_json: 'reporte-7/reporte-7-logs.json', user_owner: 'bri_riva7@hotmail.com', created_at: '2023-07-23T20:22:49.442090+00:00'},
  //   {id: '8', file_xlsx: 'reporte-8/reporte-8.xlsx', file_log: 'reporte-8/reporte-8-logs.txt', file_json: 'reporte-8/reporte-8-logs.json', user_owner: 'bri_riva8@hotmail.com', created_at: '2023-07-23T20:22:49.442090+00:00'},
  //   {id: '9', file_xlsx: 'reporte-9/reporte-9.xlsx', file_log: 'reporte-9/reporte-9-logs.txt', file_json: 'reporte-9/reporte-9-logs.json', user_owner: 'bri_riva9@hotmail.com', created_at: '2023-07-23T20:22:49.442090+00:00'},
  // ];


  listaReportes: Reporte[] = []


  displayedColumns: string[] = ['id', 'xlsx', 'log', 'zip', 'user_owner', 'created_at'];
  dataSource = new MatTableDataSource<Reporte>(this.listaReportes)

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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
}
