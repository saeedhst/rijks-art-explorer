import {Component, ElementRef, ViewChild} from "@angular/core";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {RouterLink, RouterOutlet} from "@angular/router";
import {CommonModule} from "@angular/common";
import {MatIconButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {DrawerComponent} from "./drawer/drawer.component";
import {SearchService} from "./_services/search.service";
import {MatProgressBar} from "@angular/material/progress-bar";

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [
        CommonModule,
        MatSidenavContainer,
        MatNavList,
        MatListItem,
        MatToolbar,
        MatIcon,
        RouterOutlet,
        MatSidenav,
        MatSidenavContent,
        MatIconButton,
        MatFormField,
        MatInput,
        MatLabel,
        DrawerComponent,
        RouterLink,
        MatProgressBar
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  drawerState = false;
  loading = true;

  constructor(private searchService: SearchService) {
    this.updateDrawer();
    this.searchService.loading.subscribe(res => this.loading = res);
  }

  toggleDrawer() {
    this.searchService.toggleDrawer();
  }

  updateDrawer(){
    this.searchService.drawerState.subscribe(res => {
      this.drawerState = res;
    })
  }

}
