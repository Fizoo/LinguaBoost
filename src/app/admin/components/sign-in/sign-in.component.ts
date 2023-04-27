import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

import {FirestoreService} from "../../../services/firestore.service";






@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit{

  form:FormGroup

  constructor(private fb:FormBuilder,
              private authService:AuthService,
              private router:Router,
              private firestore:FirestoreService
  ) {
  }

  ngOnInit(): void {
    this.form=this.fb.group({
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(6)]],
      checkbox:[false]
    })
  }

  onSubmit($event: any) {
    let {email,password}=this.form.value

       this.authService.login(email,password).subscribe(()=> {
         this.router.navigate(['/'])
         console.log('true')})
    //this.firestore.addProgress(x).pipe(tap(el=>console.log(el))).subscribe()
//this.firestore.addProgress(x)
    //this.firestore.deleteProgressItem(x.id).subscribe()

      //this.authService.signUp(email,password,'Oleg').subscribe()
    //this.authService.logout().subscribe(el=>console.log('logout'))
  }

  get email() {
      return this.form.controls['email']
    }
    get password() {
        return this.form.controls['password']
      }

}
