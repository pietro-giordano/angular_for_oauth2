import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-oauth-callback',
    standalone: true,
    imports: [],
    templateUrl: './oauth-callback.component.html',
    styleUrl: './oauth-callback.component.css'
})
export class OauthCallbackComponent {
    constructor(private route: ActivatedRoute, private authService: AuthService) { }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            const code = params['code'];
            const state = params['state'];

            this.authService.sendAuthCodeForToken(code, state).subscribe({
                next: (response) => {
                    console.log(response)
                    // se la risposta è ok salvare i vari token?
                },
                error: (error) => {
                    console.error(error)
                }
            });
        });
    }
}
