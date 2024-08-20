import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DebitCard } from '../models/models';
import { ApiResponse } from '../models/models';  // Assuming you have this model

@Injectable({
  providedIn: 'root'
})
export class DebitCardService {
  private apiUrl = 'http://localhost:5104/api/DebitCard';

  constructor(private http: HttpClient) { }

  getAllCards(): Observable<ApiResponse<DebitCard[]>> {
    return this.http.get<ApiResponse<DebitCard[]>>(`${this.apiUrl}/GetAllDebitCards`)
    ;
  }

 

  getCard(cardNo: number): Observable<DebitCard> {
    return this.http.get<ApiResponse<DebitCard>>(`${this.apiUrl}/${cardNo}`).pipe(
      map(response => response.result)
    );
  }

  createCard(accountNumber: number): Observable<ApiResponse<DebitCard>> {
    const debitCardData = {
      AccountNo: accountNumber,
      Cvv: 0,  // These should be set by the backend, hence initializing with default values
      Pin: 0,  // "
      ExpiryDate: new Date() // This will be overridden by the backend
    };
    return this.http.post<ApiResponse<DebitCard>>(`${this.apiUrl}/CreateDebitCard`, debitCardData);
  }

  deleteCard(accNo: number): Observable<any> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${accNo}`).pipe(
      map(response => response.result)
    );
  }
}
