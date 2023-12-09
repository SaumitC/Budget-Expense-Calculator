// budget.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from '../APP_CONSTANTS';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(private http: HttpClient) {}

  addBudgetItem(item: any): Observable<any> {
    return this.http.post(`${Constants.API_URL}/budgets/`, item);
  }

  deleteBudgetItem(item: any): Observable<any> {
    return this.http.delete(`${Constants.API_URL}/budgets/${item._id}`);
  }

  getBudgetItems(): Observable<any> {
    return this.http.get(`${Constants.API_URL}/all-budgets`);
  }
  updateBudgetItem(item: any): Observable<any> {
    return this.http.put(`${Constants.API_URL}/budgets/${item._id}`, item);
  }

  // Add additional methods for editing and fetching budget items as needed
}
