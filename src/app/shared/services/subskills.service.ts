import { Injectable } from '@angular/core';
import { catchError, map } from "rxjs/operators";
import { from, Observable, of } from "rxjs";

import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";

import { Subskill } from "../interfaces/subskill";

@Injectable({
  providedIn: 'root'
})
export class SubskillsService {

  private readonly subskillsCollection!: AngularFirestoreCollection<Subskill>;

  public subskills: Subskill[] = [];

  constructor(private afs: AngularFirestore) {
    this.subskillsCollection = this.afs.collection<Subskill>('subskills');
  }

  getAllSubskills(): Observable<Subskill[]> {
    return this.subskillsCollection.valueChanges().pipe(
      catchError((error) => {
        return of([]); // Retorna un array vacío en caso de error
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

  getSubskillsDictionary(): { [key: string]: Subskill[] } {
    let _subskills: { [key: string]: Subskill[] } = {};
    this.getAllSubskills().subscribe(subskills => {
      subskills.forEach(subskill => {
        if (!_subskills[subskill.skill_uid]) {
          _subskills[subskill.skill_uid] = [];
        }
        _subskills[subskill.skill_uid].push(subskill);
      });
    });
    return _subskills;
  }

  getSubskillById(uid: string): Observable<Subskill | undefined> {
    return this.subskillsCollection.doc<Subskill>(uid).valueChanges().pipe(
      catchError((error) => {
        return of(undefined);
      })
    );
  }


  createSubskill(subskillRequest: Subskill): Observable<void> {
    const subskillId = this.afs.createId();
    const subskill: Subskill = {
      uid: subskillId,
      name: subskillRequest.name,
      skill_uid: subskillRequest.skill_uid
    };

    return from(this.subskillsCollection.doc(subskillId).set(subskill)).pipe(
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
      catchError((error) => {
        return of(null);
      })
    );
  }

  deleteSubskill(subskill: Subskill): Observable<void> {
    return from(this.subskillsCollection.doc(subskill.uid).delete()).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }

}
