import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, map, catchError, throwError, of } from 'rxjs';
import { Usuario } from 'src/app/core/models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { enviroment } from 'src/environments/environments';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';
import { EstablecerUsuarioAutenticado, QuitarUsuarioAutenticado } from 'src/app/store/auth/auth.actions';

export interface LoginFormValue {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

//  private authUser$ = new BehaviorSubject<Usuario | null>(null);

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private store: Store<AppState>
  ) { }

  obtenerUsuarioAutenticado(): Observable<Usuario | null> {
  //  return this.authUser$.asObservable();
    return this.store.select(selectAuthUser);
  }

  private establecerUsuarioAutenticado(usuario: Usuario, token: string): void {
  //  this.authUser$.next(usuario);
    this.store.dispatch(EstablecerUsuarioAutenticado({ payload: {...usuario, token }}));
  }

  login(formValue: LoginFormValue): void {
    // const usuario: Usuario = {
    //   id: 1,
    //   nombre: 'MOCK',
    //   apellido: 'USER',
    //   email: formValue.email,
    //   role: 'user'
    // }
    // localStorage.setItem('auth-user', JSON.stringify(usuario));
    // this.authUser$.next(usuario);
    // this.router.navigate(['dashboard']);
    this.httpClient.get<Usuario[]>(
      `${enviroment.apiBaseUrl}/usuarios`,
      {
        params: {
          ...formValue
        },
      }
    ).subscribe({
      next: (usuarios) => {
        const usuarioAutenticado = usuarios[0];
        if (usuarioAutenticado) {
          localStorage.setItem('token', usuarioAutenticado.token)
        //  this.authUser$.next(usuarioAutenticado);
        //  this.establecerUsuarioAutenticado(usuarioAutenticado);
          this.establecerUsuarioAutenticado(usuarioAutenticado, usuarioAutenticado.token);
          this.router.navigate(['dashboard']);
        } else {
          alert('¡Usuario y contraseña incorrectos!')
        }
      }
    });
  }

  logout(): void {
    localStorage.removeItem('auth-user');
    // this.authUser$.next(null);
    this.store.dispatch(QuitarUsuarioAutenticado());
    this.router.navigate(['auth']);
  }

  // verificarStorage(): void {
  //   const storageValor = localStorage.getItem('auth-user');
  //   if (storageValor) {
  //     const usuario = JSON.parse(storageValor);
  //     this.authUser$.next(usuario);
  //   }
  // }

  verificarToken(): Observable<boolean> {
    const token = localStorage.getItem('token');
    return this.httpClient.get<Usuario[]>(
      `${enviroment.apiBaseUrl}/usuarios?token=${token}`,
      {
        headers: new HttpHeaders({
          'Authorization': token || '',
        }),
      }
    )
      .pipe(
        map((usuarios) => {
          const usuarioAutenticado = usuarios[0];
          if (usuarioAutenticado) {
            localStorage.setItem('token', usuarioAutenticado.token)
            // this.authUser$.next(usuarioAutenticado);
            this.establecerUsuarioAutenticado(usuarioAutenticado, usuarioAutenticado.token);
          }
          return !!usuarioAutenticado;
        }),
        catchError((err) => {
          return of(false);
        })
      );
  }

}