import { Component, NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./Auth/auth.component";
import { HeaderComponent } from "./header/header.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeResolverService } from "./recipes/Recipe-resolver.service";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";



   const approutes :Routes = [
       {path : '', redirectTo: '/recipes',pathMatch :'full'},
    { path : 'recipes' , component : RecipesComponent  ,children : [
        {path : "" ,component:  RecipeStartComponent}, 
        {path: "new", component: RecipeEditComponent,resolve:[RecipeResolverService]},
        { path:":id" , component: RecipeDetailComponent ,resolve:[RecipeResolverService]      },
        
        {path: ":id/edit", component: RecipeEditComponent,resolve:[RecipeResolverService]}  
    ],resolve:[RecipeResolverService]},
    {path : 'shopping-List' , component : ShoppingListComponent},
    {path : 'auth' , component : AuthComponent}
 
    ]


    @NgModule({
        imports: [RouterModule.forRoot(approutes)],
        exports: [RouterModule]
      })

export class AppRoutingModule {}
