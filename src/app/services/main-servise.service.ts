import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainServiseService {
  producId = new Subject<string>();
  constructor(private http: HttpClient) {}
  getPizzas(): Observable<any> {
    return this.http.get('https://sms-h9zb.onrender.com/user');
  }

  getPizzaById(id: any): Observable<any> {
    return this.http.get(`https://sms-h9zb.onrender.com/user/${id}`);
  }

  updateProduct(id: string, data: any): Observable<any> {
    return this.http.patch(`https://sms-h9zb.onrender.com/user/${id}`, data);
  }

  addProduct(data: any): Observable<any> {
    return this.http.post(`https://sms-h9zb.onrender.com/user/`, data);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`https://sms-h9zb.onrender.com/user/${id}`);
  }
}
