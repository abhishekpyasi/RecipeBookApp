import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { ingredient } from "../shared/ingredient.model";

export class shoppingListService {

    IngAddedEvent = new Subject<ingredient[]>();
    startedEditing = new Subject<number>();
    ingredients = [ new ingredient('Apples',5), new ingredient('Tomatoes',10)];  
    constructor() { }
    getIngredients(){

        return this.ingredients.slice();
    }

    getIngredient(index: number){
        // const temp = this.ingredients[index];
        // console.log('this is under getingredient' + temp + index)

        return this.ingredients[index];

    }

    addIngredients(ingredient : ingredient) {

        this.ingredients.push(ingredient);
        this.IngAddedEvent.next(this.ingredients.slice());


    }

    addingredientsfrom(ingredients: ingredient[]){

        this.ingredients.push(...ingredients);
        this.IngAddedEvent.next(this.ingredients.slice());



    }

    updateIngredient(index: number , newingredient : ingredient) {
        this.ingredients[index] = newingredient;
        this.IngAddedEvent.next(this.ingredients.slice());
      }
    deleteIngredient( index : number){

        this.ingredients.splice(index,1);
        this.IngAddedEvent.next(this.ingredients.slice());
        



    }
}