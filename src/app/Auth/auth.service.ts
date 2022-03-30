import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";

 export interface responsepayload {

    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;
    registered? :string




 }

@Injectable({providedIn : 'root'})
export class AuthService {

    user = new BehaviorSubject<User>(null);
    private tokenExpirationCounter: any;


    constructor(private http: HttpClient,private router :Router){}

    logout(){

        this.user.next(null);
        this.router.navigate(['./auth'])

    localStorage.removeItem('userData')
    }
signUp(email :string, password: string){


    console.log("in Sign Up")
    return this.http.post<responsepayload>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBr3aYnOuU8JA7K4Ov1xaZ7vOLE7YWzE4U",
    {email: email,password:password,returnSecuretoken : true})
    .pipe(catchError(
        
        /* (errorRes) => {

        let errorMessage= 'An unknown error Occured'
        if(!errorRes.error || !errorRes.error.error){

            return throwError(errorMessage)
        }
        switch(errorRes.error.error.message){
            case 'EMAIL_EXISTS':
                errorMessage = 'This e-mail already exists'
        }

        return throwError(errorMessage)

    }*/
    
   this.handleError ),tap( resData =>{

    this.handleAuthentication(resData.email, resData.localId, resData.idToken,+resData.expiresIn)
       
   }))



}

private handleAuthentication(email: string, localId: string, token : string, expiresIn : number){

    const expDate = new Date(new Date().getTime() + +expiresIn * 1000  )
    const user = new User (email,localId,token,expDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000)
    localStorage.setItem('userData',JSON.stringify(user))
    if(this.tokenExpirationCounter){

        clearTimeout(this.tokenExpirationCounter)
    }

    this.tokenExpirationCounter=null;




}

autoLogout(expirationDuration: number){
    console.log(expirationDuration)

    this.tokenExpirationCounter= setTimeout(()=>{

        this.logout();
    },expirationDuration)

    
}

autoLogin(){

    const userData : {email:string, id:string, _token : string, _tokenExpiryDate: string} =JSON.parse(localStorage.getItem('userData'))
    if(!userData) {
    return
    }

    const loadeduser = new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpiryDate))

    if(loadeduser.token){



        this.user.next(loadeduser)
        const expirationDuration = new Date(userData._tokenExpiryDate).getTime() - new Date().getTime()
        this.autoLogout(expirationDuration)
    }


}
private handleError(errorRes : HttpErrorResponse)
{

    let errorMessage= 'An unknown error Occured'
    if(!errorRes.error || !errorRes.error.error){

        return throwError(errorMessage)
    }
    switch(errorRes.error.error.message){
        case 'EMAIL_EXISTS':
            errorMessage = 'This e-mail already exists';
            break;

        case 'EMAIL_NOT_FOUND':
        errorMessage= 'this email does not exist'
        break;

    }

    return throwError(errorMessage)


}
login(email: string, password :string){

    return this.http.post<responsepayload>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBr3aYnOuU8JA7K4Ov1xaZ7vOLE7YWzE4U" , {email: email,password:password,returnSecuretoken : true})

    .pipe(catchError(this.handleError),tap( resData =>{

        this.handleAuthentication(resData.email, resData.localId, resData.idToken,+resData.expiresIn)
           
       }))

}

}