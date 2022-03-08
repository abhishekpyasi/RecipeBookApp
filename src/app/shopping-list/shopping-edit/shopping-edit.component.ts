import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ingredient } from 'src/app/shared/ingredient.model';
import { shoppingListService } from '../shoppinglist.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  subscription : Subscription;
  editMode = false;
  editeditemIndex: number;
  editedItem: ingredient; 
  @ViewChild('f', {static:false}) slForm : NgForm;




   constructor(private slservice : shoppingListService) { }
   
   ngOnInit(): void {
     
     this.subscription= this.slservice.startedEditing.subscribe(
       (index : number) =>{

        this.editeditemIndex=index;
        this.editMode= true;    
        this.editedItem = this.slservice.getIngredient(index);    

        this.slForm.setValue({'name': this.editedItem.name, 'amount': this.editedItem.amount})

       }
     );
       
       
       
      }
      
      addClicked(form: NgForm){
        
        const value = form.value;
        
        const newIngredient = new ingredient(value.name,value.amount);
        if(this.editMode){
          this.slservice.updateIngredient(this.editeditemIndex, newIngredient);

        }
        else {
      
        this.slservice.addIngredients(newIngredient);}
        this.editMode=false;
        form.reset();
                 
        
      }

      onClear(){
this.slForm.reset();
this.editMode= false;

      }
      
      ngOnDestroy(): void {

        this.subscription.unsubscribe();
      }

      onDelete(){

      this.slservice.deleteIngredient(this.editeditemIndex);
      }
    }
