import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, tap} from "rxjs";
import {RootObject} from "./detail.model";

const baseUrl = 'http://localhost:3010';
const termsApi = baseUrl + '/terms';
const searchApi = baseUrl + '/search';
const detailsApi = baseUrl + '/collection'

interface ISearchQuery {
  q: string;
  artist: string;
  type: string;
  material: string;
  technique: string;
  century: string;
  color: string;
  image: string;
  topPiece: string;
  culture: string;
}

@Injectable({
  providedIn: 'root',
})
export class RijksService {

  constructor(private httpClient: HttpClient) {
  }

  getDetails(artId: any) {
    return this.httpClient.get<RootObject>(detailsApi + '/' + artId);
  }

  search(params = {}) {
    params = new HttpParams().appendAll(params);
    return this.httpClient.get(searchApi, {params});
  }

  getMaterialList() {
    const params = {q: '', field: 'material'};
    return this.httpClient.get(termsApi, {params});
  }

  getTypeList() {
    const params = {q: '', field: 'type'};
    return this.httpClient.get(termsApi, {params});
  }

  getArtistList() {
    const params = {q: '', field: 'involvedMaker'};
    return this.httpClient.get(termsApi, {params});
  }

  getTechniqueList() {
    const params = {q: '', field: 'technique'};
    return this.httpClient.get(termsApi, {params});
  }
}

