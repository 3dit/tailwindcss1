import { effect, Injectable, Signal, signal, WritableSignal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class RecipesApiService {
    private baseUrl = "http://localhost:5000/api";

    private someState = signal('initial value ' + (new Date()).toISOString());

    constructor(private http: HttpClient) {

      //example of how effect() is not only for use in components
      effect(() => {
        if(this.someState().startsWith('change')) {
          console.log('RecipesApiService CHANGE! Value is ', this.someState());
        } else {
          console.log('effect called but someState() does not start with "change", so terminating here.');
        }
      });
    }

    getSomeStateSignal() : WritableSignal<string> {
        return this.someState;
    }

    getRecipe(id: number): Observable<any> {
        let url = `${this.baseUrl}/recipe/${id}`;
        let response = this.http.get<any>(url);
        return response;
    }

    getRecipesList(): Observable<any> {
        var url2 = `${this.baseUrl}/recipeList`;
        var list = this.http.get<any>(url2);
        return list;
    }

    saveRecipe(recipe: any): Observable<any> {
        const url = `${this.baseUrl}/saveRecipe`;
        return this.http.post<any>(url, recipe);
    }
}
