import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { from, Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "@angular/fire/auth";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "@angular/fire/firestore";

import { User } from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user?: User;
  private _userCollection: AngularFirestoreCollection<User>;

  get user(): User {
    return { ...this._user } as User;
  }


  constructor(private afs: AngularFirestore, private router: Router) {
    this._userCollection = this.afs.collection<User>('users');

    // this.createTestingUser();
  }

  createTestingUser() {
    this.register({
      email: 'test@test.com',
      password: 'password'
    }).subscribe();
  }

  register(user: User): Observable<boolean> {
    const auth = getAuth();
    return new Observable<boolean>((observer) => {
      createUserWithEmailAndPassword(auth, user.email!, user.password!)
        .then((userCredential) => {
          const _user = userCredential.user;
          const userRef = doc(getFirestore(), 'users', _user.uid);
          setDoc(userRef, {
            email: user.email,
            uid: _user.uid,
            password: user.password,
          })
            .then(() => {
              this._user = {
                email: user.email,
                uid: _user.uid,
                password: user.password,
              };
              observer.next(true);
              observer.complete();
            })
            .catch((error) => {
              console.error('Error guardando datos adicionales del usuario en Firestore:', error);
              observer.error(error);
            });
        })
        .catch((error) => {
          console.error('Error registrando usuario:', error);
          observer.error(error);
        });
    }).pipe(catchError((error) => of(false)));
  }

  login(email: string, password: string): Observable<boolean> {
    const auth = getAuth();
    return new Observable<boolean>((observer) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          if (user) {
            const userRef = doc(getFirestore(), 'users', user.uid);

            getDoc(userRef)
              .then((docSnapshot) => {
                if (docSnapshot.exists()) {
                  const userData = docSnapshot.data() as User;
                  this._user = {
                    ...userData,
                    uid: user.uid,
                  };
                  observer.next(true);
                  observer.complete();
                } else {
                  console.log('El documento del usuario no existe');
                  observer.next(false);
                  observer.complete();
                }
              })
              .catch((error) => {
                console.error('Error al obtener datos adicionales del usuario:', error);
                observer.error(error);
              });
          }
        })
        .catch((error) => {
          console.error('Error signing in:', error);
          observer.error(error);
        });
    }).pipe(catchError((error) => of(false)));
  }

  logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        this._user = undefined;
        this.router.navigate(['/portafolio']);
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  }

  validateUser(): Observable<boolean> {
    return of(!!this._user);
  }

  getUserById(uid: string): Observable<User> {
    const firestore = getFirestore();
    const userRef = doc(firestore, 'users', uid);

    return from(getDoc(userRef)).pipe(
      map((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as User;
          return { ...data, uid }; // Incluye el uid en el objeto retornado
        } else {
          throw new Error('User not found');
        }
      }),
      catchError((error) => {
        throw error;
      })
    );
  }

}

