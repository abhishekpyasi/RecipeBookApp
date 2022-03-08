import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ingredient } from "../shared/ingredient.model";
import { shoppingListService } from "../shopping-list/shoppinglist.service";
import { Recipe } from "./recipe.model";
@Injectable()

export class RecipeService {
    
recipeChanged = new Subject<Recipe[]>();  
    constructor(private slServive :shoppingListService){

    }

    private recipes: Recipe[] = [ 
        new Recipe(
          'Tasty Schnitzel',
          'A super-tasty Schnitzel - just awesome!',
          'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
          [
            new ingredient('Meat', 1),
            new ingredient('French Fries', 20)
          ]),
        new Recipe('Big Fat Burger',
          'What else you need to say?',
          'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
          [
            new ingredient('Buns', 2),
            new ingredient('Meat', 1)
          ])
      ];
    

getrecipe(index:number)  {

  return this.recipes[index];
}


    getRecipes(){

        return this.recipes.slice();
    }


    addIngredientsToShoppingList(ingredients: ingredient[]){

        this.slServive.addingredientsfrom(ingredients);
        


    }

    addRecipe(recipe : Recipe){
      this.recipes.push(recipe);
      this.recipeChanged.next(this.recipes.slice());

      
    }

    updateRecipe(index: number  , newRecipe : Recipe) {
      this.recipes[index] = newRecipe;
      this.recipeChanged.next(this.recipes.slice());


    }

    deleteRecipe(index : number){
      this.recipes.splice(index,1);
      this.recipeChanged.next(this.recipes.slice());
      
    }
}