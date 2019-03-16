import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Ingredient } from './ingredient.model';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private httpClient: HttpClient, private recipeService: RecipeService, private shoppingListService: ShoppingListService, private authService: AuthService, private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) { }

  storeRecipes() {
    // const token = this.authService.getIdToken();
    // const headers = new HttpHeaders().set('Authorization', 'Bearer chiebjkoe').append('other stuff', 'other stuff');

    // return this.httpClient.put('https://ng-recipe-book-46810.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
    //   observe: 'body', // could also be 'events' if you want to do stuff after request being sent, received, etc
    //   // headers: headers
    //   params: new HttpParams().set('auth', token)
    // });

    // the HttpRequest object lets us create a request from scratch, rather than with the default configuration from .put
    // const req = new HttpRequest('PUT', 'https://ng-recipe-book-46810.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {reportProgress: true, params: new HttpParams().set('auth', token)});

    const req = new HttpRequest('PUT', 'https://ng-recipe-book-46810.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {reportProgress: true});
    return this.httpClient.request(req);
  }

  fetchRecipes() {
    const token = this.authService.getIdToken();

    // this.httpClient.get<Recipe[]>('https://ng-recipe-book-46810.firebaseio.com/recipes.json?auth=' + token)
    this.httpClient.get<Recipe[]>('https://ng-recipe-book-46810.firebaseio.com/recipes.json?auth=' + token, {
      observe: 'body', // 'body' is default, 'response' for full response
      responseType: 'json' // default is 'json', could also be 'text', blob', 'arraybuffer'
    })
      .pipe(map(
        (recipes) => {
          console.log(recipes);
          for(let recipe of recipes) {
            if(!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      ))
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      )
  }

  storeIngredients() {
    const token = this.authService.getIdToken();

    return this.httpClient.put('https://ng-recipe-book-46810.firebaseio.com/ingredients.json?auth=' + token, this.shoppingListService.getIngredients());
  }

  // this.shoppingListService.getIngredients()

  fetchIngredients() {
    const token = this.authService.getIdToken();

    this.httpClient.get<Ingredient[]>('https://ng-recipe-book-46810.firebaseio.com/ingredients.json?auth=' + token)
      .pipe(map(
        (ingredients) => {
          return ingredients;
        }
      ))
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.shoppingListService.setIngredients(ingredients);
        }
      )
  }
}
