import { Component } from '@angular/core';
import { MenuItem } from '../../interfaces/menuItem.interface';

@Component({
  selector: 'shared-side-menu',
  templateUrl: './side-menu.component.html',
  styles: ``
})
export class SideMenuComponent {

  public reactiveMenu: MenuItem[] = [

    { title: 'Básicos', route: './reactive/basic' },
    { title: 'Dinámicos', route: './reactive/dynamic' },
    { title: 'Switches', route: './reactive/switches' },

  ]

  public authMenu: MenuItem[] = [
    { title: 'Registro', route: './auth/sign-up' },
  ]
}
