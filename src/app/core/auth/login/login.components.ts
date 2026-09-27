import { Component, signal, computed, inject, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { Auth } from '../services/authentication/auth';
import { HttpErrorResponse } from '@angular/common/http';
/**
 * Strongly-typed shape of the login form values.
 */
export interface LoginFormValue {
  email: string;
  password: string;
  rememberMe: boolean;
}

/**
 * Strongly-typed reactive form group for the login form.
 */

/**
 * Shape of the payload sent to the (simulated) authentication service.
 */
export interface LoginRequestPayload {
  email: string;
  password: string;

}

/**
 * Result returned by the simulated authentication call.
 */
export interface LoginResult {
  success: boolean;
  message: string;
}

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.components.html',
  styleUrl: './login.components.css',
})
export class LoginComponents {
 readonly isLoading = signal<boolean>(false);
  readonly showPassword = signal<boolean>(false);
  readonly formError = signal<string>('');
  readonly successMessage = signal<string>('');
  private readonly authservice=inject(Auth);
  errormessage:WritableSignal <string>=signal<string>('');
  refSubscription:Subscription = new Subscription();
   loginform!: FormGroup;
  intaiform() {
    this.loginform = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z\d@$!%*?&]{6,}$/)]),
    },
    );
  }
  constructor(private readonly fb: FormBuilder,private readonly route:Router) {
  }
  ngOnInit(){
    this.intaiform();

  }
  /** Computed error message for the email field. */
  readonly emailErrorMessage = computed(() => {
    const control = this.loginform.get('email');
    if (!control?.getError) return '';
    if (control.getError('required')) return 'Email is required.';
    if (control.getError('email')) return 'Please enter a valid email address.';
    return 'Invalid email.';
  });

  /** Computed error message for the password field. */
  readonly passwordErrorMessage = computed(() => {
    const control = this.loginform.get('password');
    if (!control?.getError) return '';
    if (control.getError('required')) return 'Password is required.';
    if (control.getError('minlength')) return 'Password must be at least 8 characters.';
    return 'Invalid password.';
  });

  /** Returns true when a given control is invalid and has been touched/dirty. */
  isInvalid(controlName: keyof LoginFormValue): boolean {
    const control: AbstractControl | null = this.loginform.get(controlName as string);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  togglePasswordVisibility(): void {
    this.showPassword.update((value) => !value);
  }

  onForgotPassword(event: Event): void {
    event.preventDefault();
    // Hook up navigation to your forgot-password flow/route here.
    console.log('Forgot password clicked');
  }

  onContinueWithGoogle(): void {
    // Hook up your OAuth / Google sign-in flow here.
    console.log('Continue with Google clicked');
  }

  onSignUp(): void {
    // Hook up navigation to your sign-up route here.
    this.route.navigate(['/signup']);;
  }

  /**
   * Simulated submit handler. Replace the setTimeout block with a real
   * call to your authentication service (e.g. this.authService.login(payload)).
   */
  onSubmit(): void {
    this.formError.set('');
    this.successMessage.set('');

    if (this.loginform.valid) {
      this.isLoading.set(true);
      this.refSubscription.unsubscribe();
      this.refSubscription=this.authservice.sendloginrdata(this.loginform.value).subscribe({
         next:(res)=>{
          console.log(res);
          this.isLoading.set(false);
          this.errormessage.set('');
          const token = res?.accessToken; // ← accessToken مش token
          if (!token) {
           this.errormessage.set('Login succeeded but no token was returned.');
          return;
            }

          localStorage.setItem('userToken', token);
          this.authservice.decodeUserToken();
          setTimeout(()=>{
              this.route.navigate(['/home']);
          },1000);



        },
        error:(err:HttpErrorResponse)=>{
          this.isLoading.set(false);
          this.errormessage.set(err.error.message);
        }
      });}
    else{
      this.loginform.markAllAsTouched();
      return;
    }

  }

  /** Replace with a real HTTP call in production. */
  private simulateLogin(payload: LoginRequestPayload): LoginResult {
    if (payload.email && payload.password.length >= 8) {
      return { success: true, message: 'Signed in successfully. Redirecting…' };
    }
    return { success: false, message: 'Invalid email or password. Please try again.' };
  }
}
