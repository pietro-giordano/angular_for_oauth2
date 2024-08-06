import { Injectable, signal, WritableSignal } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

const API_URL = environment.endpoint;

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public currentUser: WritableSignal<User | null | undefined> = signal<User | null | undefined>(undefined);

    constructor(private http: HttpClient) { }

    register(body: { name: string, email: string, password: string, password_confirmation: string }): Observable<any> {
        return this.http.post<any>(`${API_URL}/api/register`, body);
    }
}
