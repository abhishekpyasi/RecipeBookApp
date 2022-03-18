import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

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

    constructor(private http: HttpClient){}
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
    
   this.handleError ))



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

    .pipe(catchError(this.handleError))

}

}