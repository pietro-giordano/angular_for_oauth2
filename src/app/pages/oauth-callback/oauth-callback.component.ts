import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { oauthResponse } from '../../models/auth';

@Component({
    selector: 'app-oauth-callback',
    standalone: true,
    imports: [],
    templateUrl: './oauth-callback.component.html',
    styleUrl: './oauth-callback.component.css'
})
export class OauthCallbackComponent {
    public error: string | null = null;
    public success: string | null = null;

    constructor(private route: ActivatedRoute, private authService: AuthService) { }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            const code = params['code'];
            const state = params['state'];

            this.authService.sendAuthCodeForToken(code, state).subscribe({
                next: (response: oauthResponse) => {
                    console.log(response)
                    this.authService.accessToken.set(response.access_token);
                    this.authService.refreshToken.set(response.refresh_token);
                    this.authService.expiresToken.set(response.expires_in);
                    this.success = 'Autenticazione avvenuta con successo!';
                },
                error: (error) => {
                    console.error(error)
                    this.error = error.message;
                }
            });
        });
    }
}
