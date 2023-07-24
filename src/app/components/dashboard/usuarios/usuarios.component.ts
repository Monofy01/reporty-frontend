import {Component, ViewChild} from '@angular/core';
import {Reporte} from "../../../services/reporte";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  listaReportes: Reporte[] = [
    {id: '1', xlsx: 'reporte-1/reporte-1.xlsx', log: 'reporte-1/reporte-1-logs.txt', zip: 'reporte-1/reporte-1.zip', user_owner: 'bri_riva1@hotmail.com', created_at: '2023-07-23T20:22:49.442090+00:00'},
    {id: '2', xlsx: 'reporte-2/reporte-2.xlsx', log: 'reporte-2/reporte-2-logs.txt', zip: 'reporte-2/reporte-2.zip', user_owner: 'bri_riva2@hotmail.com', created_at: '2023-07-23T20:22:49.442090+00:00'},
    {id: '3', xlsx: 'reporte-3/reporte-3.xlsx', log: 'reporte-3/reporte-3-logs.txt', zip: 'reporte-3/reporte-3.zip', user_owner: 'bri_riva3@hotmail.com', created_at: '2023-07-23T20:22:49.442090+00:00'},
    {id: '4', xlsx: 'reporte-4/reporte-4.xlsx', log: 'reporte-4/reporte-4-logs.txt', zip: 'reporte-4/reporte-4.zip', user_owner: 'bri_riva4@hotmail.com', created_at: '2023-07-23T20:22:49.442090+00:00'},
    {id: '5', xlsx: 'reporte-5/reporte-5.xlsx', log: 'reporte-5/reporte-5-logs.txt', zip: 'reporte-5/reporte-5.zip', user_owner: 'bri_riva5@hotmail.com', created_at: '2023-07-23T20:22:49.442090+00:00'},
    {id: '6', xlsx: 'reporte-6/reporte-6.xlsx', log: 'reporte-6/reporte-6-logs.txt', zip: 'reporte-6/reporte-6.zip', user_owner: 'bri_riva6@hotmail.com', created_at: '2023-07-23T20:22:49.442090+00:00'},
    {id: '7', xlsx: 'reporte-7/reporte-7.xlsx', log: 'reporte-7/reporte-7-logs.txt', zip: 'reporte-7/reporte-7.zip', user_owner: 'bri_riva7@hotmail.com', created_at: '2023-07-23T20:22:49.442090+00:00'},
    {id: '8', xlsx: 'reporte-8/reporte-8.xlsx', log: 'reporte-8/reporte-8-logs.txt', zip: 'reporte-8/reporte-8.zip', user_owner: 'bri_riva8@hotmail.com', created_at: '2023-07-23T20:22:49.442090+00:00'},
    {id: '9', xlsx: 'reporte-9/reporte-9.xlsx', log: 'reporte-9/reporte-9-logs.txt', zip: 'reporte-9/reporte-9.zip', user_owner: 'bri_riva9@hotmail.com', created_at: '2023-07-23T20:22:49.442090+00:00'},
    {id: '10', xlsx: 'reporte-10/reporte-10.xlsx', log: 'reporte-10/reporte-10-logs.txt', zip: 'reporte-10/reporte-10.zip', user_owner: 'bri_riva10@hotmail.com', created_at: '2023-07-23T20:22:49.442090+00:00'},
  ];

  displayedColumns: string[] = ['id', 'xlsx', 'log', 'zip', 'user_owner', 'created_at'];
  // dataSource = ELEMENT_DATA;
  dataSource = new MatTableDataSource(this.listaReportes)

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
