// core/http/base-api.service.ts
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export abstract class BaseApiService {
  protected constructor(
    protected http: HttpClient,
    protected baseUrl: string
  ) {}

  protected get<T>(url: string, params?: HttpParams) {
    return this.http.get<T>(`${this.baseUrl}${url}`).pipe(
    catchError(this.handleError)
    ) 
  }
  protected handleError(error: any) {
    console.error('API Error:', error);
    return throwError(() => error);
  }
  protected post<T>(url: string, body: unknown) {
    return this.http.post<T>(`${this.baseUrl}${url}`, body);
  }

  protected put<T>(url: string, body: unknown) {
    return this.http.put<T>(`${this.baseUrl}${url}`, body);
  }

  protected delete<T>(url: string) {
    return this.http.delete<T>(`${this.baseUrl}${url}`);
  }
}
