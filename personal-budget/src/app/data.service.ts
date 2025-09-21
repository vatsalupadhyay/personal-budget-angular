import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private http = inject(HttpClient); 
  private dataCache: any = null; 

  getData(): Observable<any> {
    if (this.dataCache) {
      console.log('Using cached data:', this.dataCache);
      return of(this.dataCache);  
    } else {
      console.log('Fetching data from backend at http://localhost:3000/budget');
      return this.http.get<any>('http://localhost:3000/budget').pipe(
        tap((response: any) => {
          this.dataCache = response;  // ✅ Save response to cache
          console.log('Data received from backend:', response);
          console.log('Budget items:', response.myBudget);
        })
      );
    }
  }

  clearCache(): void {
    this.dataCache = null;
  }

  hasCache(): boolean {
    return this.dataCache !== null;
  }
}