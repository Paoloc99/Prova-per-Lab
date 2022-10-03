import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DateService } from '@micegroup/voila2-blazing-ng';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ApiResponse } from '@micegroup/voila2-runtime-ng';



@Injectable(
  {providedIn: 'root'}
)
export class BaseApiService<T> {

  public baseUrl: string = environment.baseUrl;
 

  constructor(protected httpClient: HttpClient, private dateService: DateService) { }

  protected getEntityListByCriteria( url: string, options?: HttpParams,): Observable<ApiResponse<T>> {
    return this.httpClient.get<any>(this.baseUrl + '/' +url + '/search', { params: options });
  }

  protected addEntityInstance(entity: T, url: string): Observable<T> {
    return this.httpClient.post<T>(this.baseUrl + '/' + url, entity);
  }

  protected getEntityInstanceById(id: string, url: string): Observable<T>  {
    return this.httpClient.get<T>(this.baseUrl + '/' + url + '/' + id);
  }

  protected updateEntityInstance(entity: T, url: string): Observable<T> {
    return this.httpClient.put<T>(this.baseUrl + '/' + url, entity);
  }

  protected deleteEntityInstance(id: string, url: string): Observable<T> {
    return this.httpClient.delete<T>(this.baseUrl + '/' + url + '/' + id);
  }

  public getEntityListByLink(link: string, options?: HttpParams): Observable<ApiResponse<T>> {
    return this.httpClient.get<any>(link, { params: options });
  }

 

}
