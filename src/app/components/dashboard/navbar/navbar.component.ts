import {Component, OnInit} from '@angular/core';
import {MenuService} from "../../../services/menu.service";
import {Menu} from "../../../interfaces/menu";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  menu: Menu[] = [];

  constructor(private _menuService: MenuService, private _userService: UserService) {
  }

  ngOnInit(): void {
    this.cargarMenu()
  }

  cargarMenu() {
    this._menuService.getMenu().subscribe(data => {
      this.menu = data;
    })
  }


  logout() {
    this._userService.logout()
  }
}
