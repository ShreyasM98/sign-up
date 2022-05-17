import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  public loginForm!: FormGroup
  constructor(private formBuilder : FormBuilder, private http : HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:[''],
      password:[''],

    })
  }
  login(){
    this.http.get<any>("http://localhost:3000/signupUsers")
    .subscribe(res=> {
      const user = res.find((a:any)=>{
        return a.email===this.loginForm.value.email && a.password === this.loginForm.value.password
      })
      if(user){
        alert("Login Success!!")
        this.loginForm.reset();
        this.router.navigate(['welcome'])
      }else{
        alert("user not found")
      }
    }, error=>{
      alert("Something went wrong")
    })
  }

}
