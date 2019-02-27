import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Ingredient } from './ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: Http, private recipeService: RecipeService, private shoppingListService: ShoppingListService) { }

  storeRecipes() {
    return this.http.put('https://ng-recipe-book-46810.firebaseio.com/recipes.json', this.recipeService.getRecipes());
  }

  fetchRecipes() {
    this.http.get('https://ng-recipe-book-46810.firebaseio.com/recipes.json')
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
    return this.http.put('https://ng-recipe-book-46810.firebaseio.com/ingredients.json', this.shoppingListService.getIngredients());
  }

  fetchIngredients() {
    this.http.get('https://ng-recipe-book-46810.firebaseio.com/ingredients.json')
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
