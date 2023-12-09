import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../APP_CONSTANTS';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
constructor(private http: HttpClient) { }

  deleteExpenseItem(item: any) :Observable<any> {
    return this.http.delete(`${Constants.API_URL}`+'/expenses/' + item._id);
  }
  addExpenseItem(newItem: { budgetId: any; amount: any; description: any; name: any; }):Observable<any>  {
   return  this.http.post(`${Constants.API_URL}`+'/expenses', newItem);
  }

  getExpenseItems() :Observable<any> {
    return this.http.get(`${Constants.API_URL}`+'/expenses');
  }

  updateExpenseItem(item: any) :Observable<any> {
    return this.http.put(`${Constants.API_URL}`+'/expenses/' + item._id, item);
  }

}
