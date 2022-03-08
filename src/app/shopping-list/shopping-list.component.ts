import { Component, OnInit } from '@angular/core';
import { ingredient } from '../shared/ingredient.model';
import { shoppingListService } from './shoppinglist.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
ingredients: ingredient[] = [];
  constructor(private slService : shoppingListService) { }

  ngOnInit(): void {

    this.ingredients=this.slService.getIngredients();
    this.slService.IngAddedEvent.subscribe((ingredients :ingredient[])=>{

      this.ingredients=ingredients;


    } )

  }

  
  onEditItems(inde : number) 
  {

      this.slService.startedEditing.next(inde);

  }
  
  
}
