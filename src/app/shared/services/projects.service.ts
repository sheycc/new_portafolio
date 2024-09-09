import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { from, Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { Project } from "../interfaces/project";
@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private readonly projectsCollection!: AngularFirestoreCollection<Project>;

  public projects: Project[] = [];

  constructor(private afs: AngularFirestore) {
    this.projectsCollection = this.afs.collection<Project>('projects');
  }

  getAllProjects(): Observable<Project[]> {
    return this.projectsCollection.valueChanges().pipe(
      catchError((_) => {
        return of([]);
      })
    );
  }

  getProjectById(uid: string): Observable<Project | undefined> {
    return this.projectsCollection.valueChanges()
      .pipe(
        map(projects => projects.find(project => project.uid === uid))
      );
  }

  createProject(projectRequest: Project): Observable<Project | null> {
    const projectId = this.afs.createId();
    const _project: Project = {
      uid: projectId,
      name: projectRequest.name,
      description: projectRequest.description,
      tech: projectRequest.tech
    };

    return from(this.projectsCollection.doc(projectId).set(_project)).pipe(
      map(() => _project),
      catchError((_) => {
        return of(null);
      })
    );
  }

  updateProject(projectRequest: Project): Observable<Project | null> {
    const _project: Partial<Project> = {
      name: projectRequest.name,
      description: projectRequest.description,
      tech: projectRequest.tech
    };

    return from(this.projectsCollection.doc(projectRequest.uid).update(_project)).pipe(
      map(() => ({
        ...projectRequest,
        ..._project
      })),
      catchError((_) => {
        return of(null);
      })
    );
  }


  deleteProject(uid: string): Observable<void> {
    return from(this.projectsCollection.doc(uid).delete()).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }
}
