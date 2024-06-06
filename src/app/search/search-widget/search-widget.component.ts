import {Component, OnDestroy} from "@angular/core";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {SearchService} from "../../_services/search.service";
import {MatChip, MatChipOption, MatChipRow, MatChipSet} from "@angular/material/chips";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-search-widget',
  templateUrl: './search-widget.component.html',
  styleUrl: './search-widget.component.scss',
  imports: [
    CommonModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    MatChipSet,
    MatChip,
    FormsModule,
    MatProgressBar,
    MatChipRow,
    MatIcon,
    MatChipOption,
  ],
  standalone: true
})
export class SearchWidgetComponent implements OnDestroy {
  query = '';
  loading = true;

  _activeFilters: Record<string, any> = {};
  displayFilters = [];

  constructor(private searchService: SearchService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

    this.activatedRoute.queryParams.subscribe(res => {
      this._activeFilters = {...res};
      const arrayParams = ['material', 'involvedMaker', 'type', 'technique'];
      arrayParams.forEach(key => {
        if (this._activeFilters[key] && typeof this._activeFilters[key] === 'string') this._activeFilters[key] = [this._activeFilters[key]];
      })
      this.displayFilters = this.getActiveFilters(res);
      this.query = res.q || '';
      this.submitSearch();
    })

    this.searchService.loading.subscribe(res => this.loading = res);
  }

  ngOnDestroy() {
    this.searchService.searchResults.next([]);
  }

  getActiveFilters(filters): Array<Record<string, string>> {
    const filtered: Array<Record<string, string>> = [];
    Object.keys(filters)
      .filter(key => !['imgonly', 'toppieces', 'culture', 'q'].includes(key))
      .forEach(key => {
        if (typeof filters[key] === 'string') {
          filtered.push({value: filters[key], key});
        } else {
          filters[key].forEach((res: any) => filtered.push({value: res, key}));
        }
      });
    return filtered;
  }

  toggleDrawer() {
    this.searchService.toggleDrawer()
  }

  removeFilter(filter) {
    const {key, value} = filter;
    const queryParams = {
      ...this._activeFilters,
      [key]: this._activeFilters[key].filter(el => el !== value),
    }
    this.router.navigate([''], {queryParams});
  }

  search() {
    const queryParams = {
      ...this._activeFilters,
      q: this.query,
    }
    this.router.navigate([''], {queryParams})
  }

  submitSearch() {
    const payload = {
      ...this._activeFilters,
      q: this.query,
    }
    this.searchService.search(payload);
  }
}
