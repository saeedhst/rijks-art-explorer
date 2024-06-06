import {Component, Input} from "@angular/core";
import {MatCard, MatCardContent, MatCardImage} from "@angular/material/card";
import {CommonModule, JsonPipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-search-item',
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    MatCardContent,
    MatCardImage,
    JsonPipe,
    RouterLink,
    MatIcon,
    MatProgressSpinner
  ],
  templateUrl: './search-item.component.html',
  styleUrl: 'search-item.component.scss'
})
export class SearchItemComponent {

  @Input() artObject: any

}
