import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL: string = 'api/';

  constructor(private httpClient: HttpClient, private toastrService: NbToastrService) {}

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  getDetectFile(): Observable<DetectFile>{
    return this.httpClient.get<DetectFile>(this.apiURL + 'thesis/detectfile')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // Error handling 
  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    this.showToast('danger','系统错误！',errorMessage);
    return throwError(errorMessage);
  }

  types: NbComponentStatus[] = [
    'primary',
    'success',
    'info',
    'warning',
    'danger',
  ];

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 2000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false,
    };
    const titleContent = title ? `. ${title}` : '';

    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }

}

export class DetectFile{
    teaname: String;
    filename: String;
    status: String;
    comment: String;
}