import { Injectable, signal, WritableSignal } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable, throwError } from 'rxjs';
import { StringUtils } from '../utils/string-utils';
import { CryptoUtils } from '../utils/crypto-utils';

const API_URL = environment.endpoint;
const CLIENT_ID = environment.client_id;
const REDIRECT_URI = environment.redirect_uri;

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    public currentUser: WritableSignal<User | null | undefined> = signal<User | null | undefined>(undefined);

    constructor(private http: HttpClient) { }

    // register method
    register(body: { name: string, email: string, password: string, password_confirmation: string }): Observable<any> {
        return this.http.post<any>(`${API_URL}/api/register`, body, { withCredentials: true });
    }

    // generate and save in sessionStorage state - for authorization_code_with_pkce grant
    generateState(): string {
        const state: string = StringUtils.generateRandomString(40);
        sessionStorage.setItem('state', state);
        console.log('State: ', state)
        return state;
    }

    // generate and save in sessionStorage code_verifier for code_challenge - for authorization_code_with_pkce grant
    generateCodeVerifier(): string {
        const codeVerifier: string = StringUtils.generateRandomString(128);
        sessionStorage.setItem('code_verifier', codeVerifier);
        console.log('code_verifier: ', codeVerifier)
        return codeVerifier;
    }

    // redirect with params for authorization code
    async redirectToOauthAuth(): Promise<void> {
        try {
            const state: string = this.generateState();
            const codeVerifier: string = this.generateCodeVerifier();
            const codeChallenge: string = await CryptoUtils.generateCodeChallenge(codeVerifier);

            const params = new URLSearchParams({
                'client_id': CLIENT_ID,
                'redirect_uri': REDIRECT_URI,
                'response_type': 'code',
                'scope': '',
                'state': state,
                'code_challenge': codeChallenge,
                'code_challenge_method': 'S256',
                // 'prompt': 'login'
            });

            window.location.href = `${API_URL}/oauth/authorize?${params.toString()}`;
        } catch (error) {
            console.error(error);
        }
    }

    // post authorization code to request access token
    sendAuthCodeForToken(code: string, state: string): Observable<any> {
        const sessionState = sessionStorage.getItem('state');
        const codeVerifier = sessionStorage.getItem('code_verifier');

        if (sessionState === null || sessionState !== state) {
            return throwError(() => new Error('Invalid state'));
        }

        const body = {
            grant_type: 'authorization_code',
            client_id: CLIENT_ID,
            redirect_uri: REDIRECT_URI,
            code_verifier: codeVerifier,
            code: code,
        };

        return this.http.post<any>(`${API_URL}/oauth/token`, body, { withCredentials: true });
    }
}
