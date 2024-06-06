import {AfterViewInit, Component, ElementRef, ViewChild} from "@angular/core";
import {RijksService} from "../_services/rijks.service";
import {RootObject} from "../_services/detail.model";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatChip, MatChipOption} from "@angular/material/chips";
import {MatButton} from "@angular/material/button";
import {SearchService} from "../_services/search.service";

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrl: './details.component.scss',
    imports: [
        CommonModule,
        MatProgressSpinner,
        MatChipOption,
        MatChip,
        RouterLink,
        MatButton,
        NgOptimizedImage
    ],
    standalone: true
})
export class DetailsComponent implements AfterViewInit {

    data: RootObject | undefined;
    similar: any;
    loading = true;
    @ViewChild('image') imgRef: ElementRef;

    constructor(private rijksService: RijksService,
                private searchService: SearchService,
                private activatedRoute: ActivatedRoute) {
        this.getData();
    }

    ngAfterViewInit() {
        this.imgRef?.nativeElement?.addEventListener('load', () => this.loading = false);
    }

    getData() {
        this.activatedRoute.params.subscribe((res: any) => {
            this.loading = true;
            this.rijksService.getDetails(res.id).subscribe((res: RootObject) => {
                this.data = res;
                if (!res?.artObject?.colorsWithNormalization?.length) return;
                this.findSimilar(res?.artObject?.colorsWithNormalization);
            });
        })
    }

    findSimilar(hex: any) {
        if (!hex?.length) return;
        this.searchService.colorSearch(hex[0].normalizedHex).subscribe((res: any) => this.similar = res.artObjects);
    }

}
