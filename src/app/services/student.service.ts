import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private studentsSubject = new BehaviorSubject<Student[]>([
    { id: 1, name: 'João', currentStars: 100, previousStars: 80, starBalance: 20, collectedPrizes: ['Lápis', 'Borracha'] },
    { id: 2, name: 'Maria', currentStars: 150, previousStars: 120, starBalance: 30, collectedPrizes: ['Caderno'] },
  ]);

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
    }
  }
}