import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { dataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeResolverService implements Resolve<Recipe[]>{
    constructor(private dataService :dataStorageService) {

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        console.log('in resolver');

        return this.dataService.fetchRecipes(); 



    }


}