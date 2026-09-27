import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import {  ValidationErrors,FormBuilder,AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";



import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Auth } from '../services/authentication/auth';
import { HttpErrorResponse } from '@angular/common/http';
export interface signupFormValue {
  first_name: string| null| undefined;
  last_name: string| null| undefined;
  email: string| null| undefined;
  password: string| null| undefined;
  phone: string| null| undefined;
}

@Component({
  selector: 'app-signup',
  imports: [ CommonModule,ReactiveFormsModule],
  templateUrl: './signup.components.html',
  styleUrl: './signup.components.css',
})

export class SignupComponents {
  signupform !: FormGroup;
  signupform1 !: FormGroup;
  private readonly auth=inject(Auth);
  readonly isloading = signal<boolean>(false);
  readonly showPassword = signal<boolean>(false);
  readonly rshowPassword = signal<boolean>(false);
  errormessage:WritableSignal <string>=signal<string>('');
  constructor(private readonly route:Router,){}
  authsubscribe !:Subscription;
  confirmPassword(group:AbstractControl){
    const password=group.get('password')?.value;
    const repassword=group.get('repassword')?.value;
    if(password===repassword){
      return null;
    }else{
      return {mismatch:true};
    }
  }
  ngOnInit(){
    this.intaiform();

  }
  intaiform(){
    //this.isloading.set(false);;

    this.signupform = new FormGroup({
      first_name: new FormControl('',[Validators.required]),
      last_name: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required,Validators.pattern(/^[A-Za-z\d@$!%*?&]{8,}$/)]),
      repassword: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    },
      { validators: this.confirmPassword },
    );
  }
  makingsignupform()
  {
    this.signupform1 = new FormGroup({
      userName: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required,Validators.pattern(/^[A-Za-z\d@$!%*?&]{6,}$/)]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
      nationality: new FormControl('',[Validators.required]),
    }
    );
    const control1 =this.signupform.get('phone') ;
   const control2 = this.signupform.get('first_name');
   const control21 = this.signupform.get('last_name');
   const control3 = this.signupform.get('email');
   const control4 = this.signupform.get('password');
   const c=control2?.value+control21?.value;
    this.signupform1.setValue({
      userName:c,
      email:control3?.value,
      password:control4?.value,
      phone:control1?.value,
      nationality:'Egyptian',
  });


  }
  signup(){
    this.authsubscribe?.unsubscribe();

    if(this.signupform.valid){
      this.makingsignupform();
      //console.log(this.signupform1);
      this.isloading.set(true);
      this.authsubscribe =this.auth.sendregisterdata(this.signupform1.value).subscribe({
        next:(res)=>{
          console.log(res);
          this.isloading.set(false);
          this.errormessage.set('');
          setTimeout(()=>{
              this.route.navigate(['/login']);
          },1000);

        },
        error:(err:HttpErrorResponse)=>{
          this.isloading.set(false);
          this.errormessage.set(err.error.message);
        }
      });


    }
    else {
      this.signupform.markAllAsTouched();
    }
  }

  readonly emailErrorMessage = computed(() => {
    const control = this.signupform.get('email');
    if (!control?.getError) return '';
    if (control.getError('required')) return 'Email is required.';
    if (control.getError('email')) return 'Please enter a valid email address.';
    return 'Invalid email.';
  });
  readonly phoneErrorMessage = computed(() => {
    const control = this.signupform.get('phone');
    if (!control?.getError) return '';
    if (control.getError('required')) return 'Phone Number is required.';
    if (control.getError('phone')) return 'Please enter a valid Phone Number.';
    return 'Invalid Phone Number.';
  });

  togglePasswordVisibility(): void {
    this.showPassword.update((value) => !value);
  }
  rtogglePasswordVisibility(): void {
    this.rshowPassword.update((value) => !value);
  }
  isInvalid(controlName: keyof signupFormValue): boolean {
      const control: AbstractControl | null = this.signupform.get(controlName as string);
      return !!control && control.invalid && (control.touched || control.dirty);
    }
    onLogin():void{
      this.route.navigate(['/login']);
    }
}
