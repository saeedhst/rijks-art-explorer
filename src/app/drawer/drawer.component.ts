import {Component} from "@angular/core";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {ActivatedRoute, ParamMap, Router, RouterOutlet} from "@angular/router";
import {CommonModule} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatCheckbox} from "@angular/material/checkbox";
import {RijksService} from "../_services/rijks.service";
import {HttpClient} from "@angular/common/http";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {SearchService} from "../_services/search.service";

const alphabeticSort = (a: any, b: any) => {
  if (a.name.toLowerCase() > b.name.toLowerCase()) {
    return 1;
  }
  return -1
}

@Component({
  selector: 'app-drawer',
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
    MatSelect,
    ReactiveFormsModule,
    MatOption,
    MatCheckbox,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatButton
  ],
  providers: [RijksService, HttpClient],
  templateUrl: './drawer.component.html',
  styleUrl: 'drawer.component.scss'
})
export class DrawerComponent {

  materialList: any;
  typeList: any;
  artistList: any;
  techniqueList: any;

  form = new FormGroup({
    involvedMaker: new FormControl(''),
    type: new FormControl(''),
    material: new FormControl(''),
    technique: new FormControl(''),
    imgonly: new FormControl(false),
    toppieces: new FormControl(false),
    culture: new FormControl('en'),
  });


  constructor(private rijksService: RijksService,
              private searchService: SearchService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.getOptions();

    this.activatedRoute.queryParams.subscribe((res: any) => {
      const params = {...res};
      const arrayParams = ['material', 'involvedMaker', 'type', 'technique'];
      arrayParams.forEach(key => {
        if (params[key] && typeof params[key] === 'string') params[key] = [params[key]];
      });
      this.form.patchValue(params);
    });
  }

  getOptions() {
    this.rijksService.getMaterialList().subscribe((res: any) => {
      this.materialList = res.sort(alphabeticSort);
    });
    this.rijksService.getTypeList().subscribe((res: any) => {
      this.typeList = res.sort(alphabeticSort);
    });
    this.rijksService.getArtistList().subscribe((res: any) => {
      this.artistList = res.sort(alphabeticSort);
    });
    this.rijksService.getTechniqueList().subscribe((res: any) => {
      this.techniqueList = res.sort(alphabeticSort);
    });
  }

  submit() {
    const payload: any = this.form.value;
    let queryParams = {};
    Object.keys(payload).filter(key => payload[key]).forEach(key => queryParams[key] = payload[key]);
    this.searchService.toggleDrawer();
    this.router.navigate([''], {queryParams})
  }
}
