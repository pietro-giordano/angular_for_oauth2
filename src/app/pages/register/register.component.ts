import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

export const matchPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const passwordValue = control.get('password');
    const confirmPasswordValue = control.get('password_confirmation');

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
        name: new FormControl(null, { validators: [Validators.required, Validators.minLength(6), Validators.maxLength(32)] }),
        password: new FormControl(null, { validators: [Validators.required, Validators.minLength(8)] }),
        password_confirmation: new FormControl(null, { validators: [Validators.required] })
    }, { validators: matchPasswordValidator });

    constructor(private authService: AuthService) { }

    get email(): FormControl {
        return this.registerForm.get('email') as FormControl;
    }

    get name(): FormControl {
        return this.registerForm.get('name') as FormControl;
    }

    get password(): FormControl {
        return this.registerForm.get('password') as FormControl;
    }

    get password_confirmation(): FormControl {
        return this.registerForm.get('password_confirmation') as FormControl;
    }

    onSubmit(): void {
        this.authService.register(this.registerForm.getRawValue()).subscribe({
            next: (response) => {
                console.log(response);
            },
            error: (error) => {
                console.error(error);
            }
        });
    }
}
