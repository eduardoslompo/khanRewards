import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private studentsSubject: BehaviorSubject<Student[]>;

  constructor() {
    const savedStudents = this.loadStudentsFromLocalStorage();
    if (savedStudents.length > 0) {
      this.studentsSubject = new BehaviorSubject<Student[]>(savedStudents);
    } else {
      this.studentsSubject = new BehaviorSubject<Student[]>([
        { id: 1, name: 'João', currentStars: 100, previousStars: 80, starBalance: 20, collectedPrizes: ['Lápis', 'Borracha'] },
        { id: 2, name: 'Maria', currentStars: 150, previousStars: 120, starBalance: 30, collectedPrizes: ['Caderno'] },
      ]);
      this.saveStudentsToLocalStorage();
    }
  }

  getStudents(): Observable<Student[]> {
    return this.studentsSubject.asObservable();
  }

  updateStudent(updatedStudent: Student): void {
    const students = this.studentsSubject.value;
    const index = students.findIndex(student => student.id === updatedStudent.id);
    if (index !== -1) {
      updatedStudent.starBalance = updatedStudent.currentStars - updatedStudent.previousStars;
      students[index] = updatedStudent;
      this.studentsSubject.next(students);
      this.saveStudentsToLocalStorage();
    }
  }

  private saveStudentsToLocalStorage(): void {
    localStorage.setItem('students', JSON.stringify(this.studentsSubject.value));
  }

  private loadStudentsFromLocalStorage(): Student[] {
    const savedStudents = localStorage.getItem('students');
    return savedStudents ? JSON.parse(savedStudents) : [];
  }
}