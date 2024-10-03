import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';
import { EditStudentDialogComponent } from '../edit-student-dialog/edit-student-dialog.component';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements OnInit {
  dataSource: MatTableDataSource<Student> = new MatTableDataSource<Student>([]);
  displayedColumns: string[] = ['name', 'currentStars', 'previousStars', 'starBalance', 'collectedPrizes', 'actions'];

  constructor(private studentService: StudentService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.studentService.getStudents().subscribe(students => {
      students.forEach(student => {
        student.starBalance = student.currentStars - student.previousStars;
      });
      this.dataSource.data = students;
    });
  }

  editStudent(student: Student): void {
    const dialogRef = this.dialog.open(EditStudentDialogComponent, {
      width: '400px',
      data: { ...student }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.starBalance = result.currentStars - result.previousStars;
        this.studentService.updateStudent(result);
      }
    });
  }
}