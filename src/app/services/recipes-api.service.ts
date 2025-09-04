import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesApiService {
  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  getRecipe(id:number): Observable<any> {
    let url = `${this.baseUrl}/recipe/${id}`;
    let response = this.http.get<any>(url);
    return response;
  }

  getRecipesList() : Observable<any> {
    var url2 = `${this.baseUrl}/recipeList`;
    var list = this.http.get<any>(url2);
    list.subscribe(data => console.log(data));
    return list;
  }
}
