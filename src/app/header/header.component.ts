import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../Auth/auth.service';
import { dataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

  userSub: Subscription; 
  isAuthenticated= false;
constructor(private dataStorageService : dataStorageService , private authService :AuthService) { }

ngOnInit(){
  
  this.userSub = this.authService.user.subscribe( user =>{

    this.isAuthenticated=!!user;
    
    
  })
  
  
}

onSaveData(){
  
  this.dataStorageService.storeRecipes()
  
  
}

OnFetchRecipes()
{
  this.dataStorageService.fetchRecipes().subscribe()
}

ngOnDestroy(): void {
  this.userSub.unsubscribe();
}
}
