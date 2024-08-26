import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    public isLoading: boolean = false;
    loginForm: FormGroup = new FormGroup({
        email: new FormControl(null, { validators: [Validators.required, Validators.email] }),
        password: new FormControl(null, { validators: [Validators.required, Validators.minLength(8)] })
    });

    constructor(private authService: AuthService) { }

    get email(): FormControl {
        return this.loginForm.get('email') as FormControl;
    }

    get password(): FormControl {
        return this.loginForm.get('password') as FormControl;
    }

    onSubmit(): void {
        this.isLoading = true;
        this.authService.redirectToOauthAuth();
    }
}
