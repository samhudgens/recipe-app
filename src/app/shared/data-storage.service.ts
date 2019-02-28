import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Ingredient } from './ingredient.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: Http, private recipeService: RecipeService, private shoppingListService: ShoppingListService, private authService: AuthService) { }

  storeRecipes() {
    const token = this.authService.getIdToken();

    return this.http.put('https://ng-recipe-book-46810.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
  }

  fetchRecipes() {
    const token = this.authService.getIdToken();

    this.http.get('https://ng-recipe-book-46810.firebaseio.com/recipes.json?auth=' + token)
      .pipe(map(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
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

    return this.http.put('https://ng-recipe-book-46810.firebaseio.com/ingredients.json?auth=' + token, this.shoppingListService.getIngredients());
  }

  fetchIngredients() {
    const token = this.authService.getIdToken();

    this.http.get('https://ng-recipe-book-46810.firebaseio.com/ingredients.json?auth=' + token)
      .pipe(map(
        (response: Response) => {
          const ingredients: Ingredient[] = response.json();
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
