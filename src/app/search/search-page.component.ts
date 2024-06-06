import {Component} from "@angular/core";
import {SearchWidgetComponent} from "./search-widget/search-widget.component";
import {SearchItemComponent} from "./search-item/search-item.component";
import {MatCard, MatCardContent, MatCardImage} from "@angular/material/card";
import {SearchService} from "../_services/search.service";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {NotFoundComponent} from "../not-found/not-found.component";
import {MatSnackBar} from "@angular/material/snack-bar";

interface ISearchResult {
  "links": {
    "self": string;
    "web": string;
  },
  "id": string;
  "objectNumber": string;
  "title": string;
  "hasImage": true,
  "principalOrFirstMaker": string;
  "longTitle": string;
  "showImage": true,
  "permitDownload": true,
  "webImage": {
    "guid": string,
    "offsetPercentageX": 0,
    "offsetPercentageY": 0,
    "width": 2189,
    "height": 2500,
    "url": string
  },
  "headerImage": {
    "guid": string;
    "offsetPercentageX": 0,
    "offsetPercentageY": 0,
    "width": 1920,
    "height": 460,
    "url": string
  },
  "productionPlaces": []
}

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  standalone: true,
  imports: [
    SearchWidgetComponent,
    SearchItemComponent,
    MatCard,
    MatCardContent,
    MatCardImage,
    NgForOf,
    RouterLink,
    NotFoundComponent,
    NgIf
  ]
})
export class SearchPageComponent {
  searchResult: ISearchResult[] = [];
  loading = true;
  page = 1;

  constructor(private searchService: SearchService,
              private snackBar: MatSnackBar) {
    this.search();
    this.searchService.loading.subscribe(res => this.loading = res);
  }

  search() {
    this.searchService.searchResults.subscribe((res: any) => {
      this.searchResult = res;
    })
  }

  loadMore() {
    if (this.loading) return;
    this.page++;
    this.searchService.loadMore(this.page);
  }

  openSnackBar(item) {
    if (item.permitDownload) return;
    const msg = 'Unfortunately RijksMuseum does not provide details and/or image for this item.'
    this.snackBar.open(msg, '', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 4000,
    });
  }

}
