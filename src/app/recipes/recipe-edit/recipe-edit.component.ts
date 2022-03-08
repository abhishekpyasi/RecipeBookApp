 import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id:number;
  editmode = false;
  recipeForm : FormGroup;


  constructor(private route : ActivatedRoute, private recipeService : RecipeService, private router :Router ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params: Params) => {

      this.id= + params.get('id');
      this.editmode= params.get('id') != null 
      this.initForm();


    })
  }

  
  private initForm(){
    let recipeName ='';
    let imagePath='';
    let recipeDesc= ''
    let recipeIngredients = new FormArray([]);

    if (this.editmode){
      let recipe = this.recipeService.getrecipe(this.id);

       recipeName = recipe.name;
       imagePath = recipe.imagepath;
       recipeDesc = recipe.description;
       if(recipe['ingredients']){ 
         for (let ingredient of recipe.ingredients){
           recipeIngredients.push(new FormGroup({
            name : new FormControl(ingredient.name,Validators.required),
            amount : new FormControl(ingredient.amount, [Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])

           }))
         }
       }
    }

    this.recipeForm = new FormGroup({

      'name' : new FormControl(recipeName,Validators.required),
      'imagepath' :  new FormControl(imagePath,Validators.required),
      'description' :  new FormControl(recipeDesc,Validators.required),
      'ingredients' : recipeIngredients


    })

    
  }
  
  onSubmit(){

    const recipe = new Recipe(this.recipeForm.value ['name'],this.recipeForm.value ['description'],this.recipeForm.value ['imagepath'],this.recipeForm.value['ingredients'] )

    if(this.editmode) {


      this.recipeService.updateRecipe(this.id, recipe);

    } else {
      this.recipeService.addRecipe(recipe);
    }

    this.onCancel();

  }

  getcontrols() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient(){

    (<FormArray>this.recipeForm.get('ingredients')).controls.push(new FormGroup({
      name : new FormControl(),
      amount : new FormControl()
    }))
  }
  onCancel(){

this.router.navigate(['../'],{relativeTo: this.route})    ;

  }
  OnDeletingIngredient(index : number){

    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
