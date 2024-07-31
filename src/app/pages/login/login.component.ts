import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule, NgIf],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    loginForm: FormGroup = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    });

    get email(): FormControl {
        return this.loginForm.get('email') as FormControl;
    }

    get password(): FormControl {
        return this.loginForm.get('password') as FormControl;
    }

    onSubmit(): void {
        console.log('ciao')
    }
}
