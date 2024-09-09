import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { catchError, map } from "rxjs/operators";
import { from, Observable, of } from "rxjs";

import { Subskill } from "../interfaces/subskill";

@Injectable({
  providedIn: 'root'
})
export class SubskillsService {

  private readonly subskillsCollection!: AngularFirestoreCollection<Subskill>;

  constructor(private afs: AngularFirestore) {
    this.subskillsCollection = this.afs.collection<Subskill>('subskills');
  }

  getAllSubskills(): Observable<Subskill[]> {
    return this.subskillsCollection.valueChanges().pipe(
      catchError((_) => {
        return of([]);
      })
    );
  }

  getAllSubskillsBySkill(skill_uid: string): Observable<Subskill[]> {
    return this.afs.collection<Subskill>('subskills', ref => ref.where('skill_uid', '==', skill_uid))
      .valueChanges()
      .pipe(
        catchError((error) => {
          throw error;
        })
      );
  }

  getSubskillsDictionary(): Observable<{ [key: string]: Subskill[] }> {
    return this.getAllSubskills().pipe(
      map(subskills => {
        let _subskills: { [key: string]: Subskill[] } = {};
        subskills.forEach(subskill => {
          if (!_subskills[subskill.skill_uid]) {
            _subskills[subskill.skill_uid] = [];
          }
          _subskills[subskill.skill_uid].push(subskill);
        });
        return _subskills; // Retorna el diccionario de subskills
      }),
      catchError(error => {
        console.error('Error al obtener subskills:', error);
        return of({}); // Retorna un objeto vacío en caso de error
      })
    );
  }

  getSubskillById(uid: string): Observable<Subskill | undefined> {
    return this.subskillsCollection.doc<Subskill>(uid).valueChanges().pipe(
      catchError((_) => {
        return of(undefined);
      })
    );
  }

  createSubskill(subskillRequest: Subskill): Observable<Subskill | null> {
    const _subskillId = this.afs.createId();
    const _subskill: Subskill = {
      uid: _subskillId,
      name: subskillRequest.name,
      skill_uid: subskillRequest.skill_uid
    };
    return from(this.subskillsCollection.doc(_subskillId).set(_subskill)).pipe(
      map(() => _subskill),
      catchError((error) => {
        throw error;
      })
    );
  }


  updateSubskill(subskillRequest: Subskill): Observable<Subskill | null> {
    const _skill: Partial<Subskill> = {
      name: subskillRequest.name,
    };
    return from(this.subskillsCollection.doc(subskillRequest.uid).update(_skill)).pipe(
      map(() => ({
        ...subskillRequest,
        ..._skill
      })),
      catchError((_) => {
        return of(null);
      })
    );
  }

  deleteSubskill(uid: string): Observable<void> {
    return from(this.subskillsCollection.doc(uid).delete()).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }

}
