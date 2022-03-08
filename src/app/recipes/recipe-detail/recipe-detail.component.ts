import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeData:Recipe;
  id:number;

  constructor(private recipeService :RecipeService, private route: ActivatedRoute, private router :Router) { 

    

  }

  ngOnInit(): void {

    

    this.route.paramMap.subscribe( (params: Params) => {

      this.id= + params.get('id')
      this.recipeData = this.recipeService.getrecipe(this.id)
    }
    
    );

  }


  addToShoppinglist(){
this.recipeService.addIngredientsToShoppingList(this.recipeData.ingredients)

  }


  onclick(){
//
    this.router.navigate(['../',this.id, 'edit'], {relativeTo :this.route})
    //alternate to above 
    // this.router.navigate(['edit'],{relativeTo : this.route})

  }

  onDelete(){

    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes'])


  }
}
