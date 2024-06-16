import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {RootObject} from "../_models/detail.model";

const API = {
  TERMS: '/en/search/advanced/terms',
  COLLECTION: '/api/en/collection',
};

@Injectable({
  providedIn: 'root',
})
export class RijksService {

  constructor(private httpClient: HttpClient) {
  }

  getDetails(artId: any) {
    return this.httpClient.get<RootObject>(API.COLLECTION + '/' + artId);
  }

  search(params = {}) {
    params = new HttpParams().appendAll(params);
    return this.httpClient.get(API.COLLECTION, {params});
  }

  getMaterialList() {
    const params = {q: '', field: 'material'};
    return this.httpClient.get(API.TERMS, {params});
  }

  getTypeList() {
    const params = {q: '', field: 'type'};
    return this.httpClient.get(API.TERMS, {params});
  }

  getArtistList() {
    const params = {q: '', field: 'involvedMaker'};
    return this.httpClient.get(API.TERMS, {params});
  }

  getTechniqueList() {
    const params = {q: '', field: 'technique'};
    return this.httpClient.get(API.TERMS, {params});
  }
}

