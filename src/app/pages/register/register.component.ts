import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [ReactiveFormsModule, NgIf],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent {
    registerForm: FormGroup = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
        username: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
        password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    });

    get email(): FormControl {
        return this.registerForm.get('email') as FormControl;
    }

    get username(): FormControl {
        return this.registerForm.get('username') as FormControl;
    }

    get password(): FormControl {
        return this.registerForm.get('password') as FormControl;
    }

    onSubmit(): void {
        console.log('register')
    }
}
