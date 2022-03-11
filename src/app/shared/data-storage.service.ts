import { Injectable } from "@angular/core";
import { map, tap } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";

 

@Injectable()
export class dataStorageService {

    constructor(private http : HttpClient, private recipesService : RecipeService ){}

    storeRecipes(){

        const recipes = this.recipesService.getRecipes();

        this.http.put('https://recipebook-1af60-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json',recipes).subscribe(response => console.log(response))

        console.log("In DataStorage service")
    }

    fetchRecipes(){

        return this.http.get<Recipe[]>('https://recipebook-1af60-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json')
        .pipe(map((recipes : Recipe[])  =>{

            return recipes.map( (recipe) => {   

                return { ...recipe , ingredients: recipe.ingredients ? recipe.ingredients : []}
                     }

                 


            )



        } ),tap(recipe => {
            this.recipesService.setRecipes(recipe);

            console.log("in data service             ")

        }))

}
}
