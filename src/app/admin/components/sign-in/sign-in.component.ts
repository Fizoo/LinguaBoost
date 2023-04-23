import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { AuthService } from '../../services/auth.service';




@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit{

  form:FormGroup

  constructor(private fb:FormBuilder,
              private authService:AuthService
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
    this.authService.login(email,password).subscribe(()=>console.log('true'))
      //this.authService.signUp(email,password).subscribe()
    //this.authService.logout().subscribe(el=>console.log('logout'))
  }

  get email() {
      return this.form.controls['email']
    }
    get password() {
        return this.form.controls['password']
      }

}
