import { Injectable } from '@angular/core';
import { catchError, map } from "rxjs/operators";
import {forkJoin, from, Observable, of, switchMap} from "rxjs";

import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";

import { Skill } from "../interfaces/skill";
import {Subskill} from "../interfaces/subskill";
import {SubskillsService} from "./subskills.service";

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  private readonly skillsCollection!: AngularFirestoreCollection<Skill>;
  private readonly subskillsCollection!: AngularFirestoreCollection<Subskill>;

  // public skills: Skill[] = [];

  constructor(private afs: AngularFirestore, private subskillsService: SubskillsService) {
    this.skillsCollection = this.afs.collection<Skill>('skills');
    this.subskillsCollection = this.afs.collection<Subskill>('subskills');
  }

  getAllSkills(): Observable<Skill[]> {
    return this.skillsCollection.valueChanges().pipe(
      catchError((error) => {
        return of([]); // Retorna un array vacío en caso de error
      })
    );
  }


  getSkillById(uid: string): Observable<Skill | undefined> {
    return this.skillsCollection.doc<Skill>(uid).valueChanges().pipe(
      catchError((error) => {
        return of(undefined);
      })
    );
  }

  createSkill(skillRequest: Skill): Observable<Skill | null> {
    const skillId = this.afs.createId();
    const _skill: Skill = {
      uid: skillId,
      name: skillRequest.name,
      rating: skillRequest.rating,
      icon: skillRequest.icon
    };

    return from(this.skillsCollection.doc(skillId).set(_skill)).pipe(
      map(() => _skill),
      catchError((error) => {
        return of(null);
      })
    );
  }

  updateSkill(skillRequest: Skill): Observable<Skill | null> {
    const _skill: Partial<Skill> = {
      name: skillRequest.name,
      rating: skillRequest.rating,
      icon: skillRequest.icon
    };

    return from(this.skillsCollection.doc(skillRequest.uid).update(_skill)).pipe(
      map(() => ({
        ...skillRequest,
        ..._skill
      })),
      catchError((error) => {
        return of(null);
      })
    );
  }

  deleteSkill(uid: string): Observable<void> {
    //TODO Mejorar
    this.subskillsService.getAllSubskillsBySkill(uid).subscribe(subskills => {
      subskills.forEach(subskill => {
        from(this.subskillsCollection.doc(subskill.uid).delete()).pipe(
          catchError((error) => {
            throw error;
          })
        );
      });
    });
    return from(this.skillsCollection.doc(uid).delete()).pipe(
      catchError((error) => {
        throw error;
      })
    );

  }

}
