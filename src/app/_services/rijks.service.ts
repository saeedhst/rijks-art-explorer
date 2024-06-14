import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {RootObject} from "./detail.model";
import {environment} from "../../../environments/environment";

const baseUrl = environment.API_URL;
const termsApi = baseUrl + '/en/search/advanced/terms';
const searchApi = baseUrl + '/api/en/collection';
const detailsApi = baseUrl + '/api/en/collection';

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

