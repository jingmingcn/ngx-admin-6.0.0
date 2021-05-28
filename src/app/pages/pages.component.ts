import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { NbAccessChecker } from '@nebular/security';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit{

  menu = MENU_ITEMS;

  constructor(private accessChecker: NbAccessChecker) {
  }

  ngOnInit() {
    this.menu.forEach(menuItem => {
      if (menuItem.data && menuItem.data['permission'] && menuItem.data['resource']) {
        this.accessChecker.isGranted(menuItem.data['permission'], menuItem.data['resource']).subscribe(granted => {
          menuItem.hidden = !granted;
        });
      } else {
        menuItem.hidden = false;
      }
      if (!menuItem.hidden && menuItem.children != null) {
        menuItem.children.forEach(item => {
          if (item.data && item.data['permission'] && item.data['resource']) {
            this.accessChecker.isGranted(item.data['permission'], item.data['resource']).subscribe(granted => {
              item.hidden = !granted;
            });
          } else {
            // if child item do not config any `data.permission` and `data.resource` just inherit parent item's config
            item.hidden = menuItem.hidden;
          }
        });
      }
    });
  }
}
