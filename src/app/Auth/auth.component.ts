import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})

export class AuthComponent {

    constructor(private authService : AuthService){}

    isLogin = true;
    error:string = null;

    onSwitch() {

        this.isLogin = !this.isLogin;
    }

    onSubmit(form : NgForm){
        // if(!form.valid) {
        // return; }
        
        

        const email = form.value.email;
        const password = form.value.password;
        if(this.isLogin) {
            //...

            this.authService.login(email,password).subscribe(res => {
                console.log(res)},errorMessage => {
    
                    this.error=errorMessage;
    
                    console.log(errorMessage)
                    
                    
                })
        }
        else {
        // console.log(form)  ;
        this.authService.signUp(email,password).subscribe(res => {
            console.log(res)},errorMessage => {

                this.error=errorMessage;

                console.log(errorMessage)
                
                
            })} 


        form.reset()
    
    }

}   