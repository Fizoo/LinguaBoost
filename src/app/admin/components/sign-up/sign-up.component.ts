import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {FirestoreService} from "../../../services/firestore.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  form:FormGroup

  constructor(private fb:FormBuilder,
              private authService:AuthService,
              private router:Router,
              private firestore:FirestoreService
  ) {
  }

  ngOnInit(): void {
    this.form=this.fb.group({
      nickname:['',Validators.required],
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(6)]]
    })
  }

  onSubmit($event: any) {
    let {nickname,email,password}=this.form.value
    console.log(nickname,email,password)

    this.authService.signUp(email,password,nickname).subscribe((el)=> {

      this.router.navigate(['admin'])
      console.log('true')}
    )
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
  get nickname() {
    return this.form.controls['nickname']
  }


}
