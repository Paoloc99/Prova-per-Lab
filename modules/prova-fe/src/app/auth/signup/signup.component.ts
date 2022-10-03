import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../auth.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm !: FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.inizializeForm()
  }


  inizializeForm() : void {
    this.signupForm = this.formBuilder.group({
      'name': [null, [Validators.required]],
      'surname':[ null,[Validators.required]],
      'birdthDate':[ null,[Validators.required]],
      'gender':[ null,[Validators.required]],
      'username': [null, [Validators.required]],
      'password':[ null,[Validators.required]]
  })
  }


  public signup() : void {
    if(this.signupForm.valid) {
           this.router.navigate(['/auth/login'])
    }
  }

}

