import {Routes} from '@angular/router';
import {SearchPageComponent} from "./search/search-page.component";
import {DetailsComponent} from "./details/details.component";

export const routes: Routes = [
  {path: 'search', component: SearchPageComponent},
  {path: 'details/:id', component: DetailsComponent},
  {path: '**', redirectTo: 'search'},
];
