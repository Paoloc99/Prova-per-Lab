import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm !: FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.inizializeForm()
  }


  inizializeForm() : void {
    this.loginForm = this.formBuilder.group({
      'username': [null, [Validators.required]],
      'password':[ null,[Validators.required]]
  })
  }


  public login() : void {
    if(this.loginForm.valid) {
           this.router.navigate(['/pages/home'])
    }
  }

}
