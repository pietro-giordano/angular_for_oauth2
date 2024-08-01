import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

export const matchPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const passwordValue = control.get('password');
    const confirmPasswordValue = control.get('confirmPassword');

    return passwordValue?.value !== confirmPasswordValue?.value ? { passwordMismatch: true } : null;
}


@Component({
    selector: 'app-register',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent {
    registerForm: FormGroup = new FormGroup({
        email: new FormControl(null, { validators: [Validators.required, Validators.email] }),
        username: new FormControl(null, { validators: [Validators.required, Validators.minLength(6), Validators.maxLength(32)] }),
        password: new FormControl(null, { validators: [Validators.required, Validators.minLength(8)] }),
        confirmPassword: new FormControl(null, { validators: [Validators.required] })
    }, { validators: matchPasswordValidator });

    get email(): FormControl {
        return this.registerForm.get('email') as FormControl;
    }

    get username(): FormControl {
        return this.registerForm.get('username') as FormControl;
    }

    get password(): FormControl {
        return this.registerForm.get('password') as FormControl;
    }

    get confirmPassword(): FormControl {
        return this.registerForm.get('confirmPassword') as FormControl;
    }

    onSubmit(): void {
        console.log('register')
    }
}
