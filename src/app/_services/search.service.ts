import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {RijksService} from "./rijks.service";

@Injectable({
    providedIn: "root"
})
export class SearchService {

    drawerState: BehaviorSubject<boolean> = new BehaviorSubject(false);
    searchResults = new BehaviorSubject<any[]>([]);
    activeFilters;
    loading = new BehaviorSubject(false);

    constructor(private rijksService: RijksService) {
    }

    toggleDrawer() {
        const newState = !this.drawerState.value;
        this.drawerState.next(newState);
    }

    search(params: any) {
        this.loading.next(true);
        this.activeFilters = params;
        return this.rijksService.search(params).subscribe((res: any) => {
            this.searchResults.next(res.artObjects);
            this.loading.next(false);
        })
    }

    loadMore(page: number) {
        this.loading.next(true);
        return this.rijksService.search({...this.activeFilters, p: page}).subscribe((res: any) => {
            const currentResults = this.searchResults.value;
            this.searchResults.next([...currentResults, ...res.artObjects]);
            this.loading.next(false);
        })
    }

    colorSearch(hex: string) {
        const payload = {
            'f.normalized32Colors.hex': hex,
            imgonly: true,
            toppieces: true,
            ps: 4,
        }
        return this.rijksService.search(payload);
    }

}
