// dashboard.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from '../APP_CONSTANTS';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {



  constructor(private http: HttpClient) {}

  getMonthlyExpense(): Observable<any> {
    return this.http.get(`${Constants.API_URL}/expenses-monthly`);
  }
  getMonthlyBudget(): Observable<any> {
    return this.http.get(`${Constants.API_URL}/budgets-monthly`);
  }

  getBudgetsPieChart() {
    return this.http.get(`${Constants.API_URL}/budgets-pie-chart`);
  }
  getBudgetsBarChart() {
    return this.http.get(`${Constants.API_URL}/budgets-bar-chart`);
  }

  // Add additional methods for fetching other dashboard data as needed
}
