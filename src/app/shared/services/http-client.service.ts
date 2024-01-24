import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { formDataValue } from '../models/form.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private _httpClient : HttpClient) { }

  public submitFormData(postValue: formDataValue): Observable<any>{
    return this._httpClient.post('https://14301428-d832-4433-a8a2-a59e30b52c65.mock.pstmn.io', postValue);
  }

}
