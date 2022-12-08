import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems: any[] = [];

  constructor(private sidebar: SidebarService) {
    this.menuItems = sidebar.menu;
    console.log(this.menuItems);
  }

  ngOnInit(): void {

  }

}
