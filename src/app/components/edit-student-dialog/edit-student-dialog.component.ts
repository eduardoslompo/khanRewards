import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-edit-student-dialog',
  template: `
    <h2 mat-dialog-title>Editar Estudante</h2>
    <mat-dialog-content>
      <mat-form-field>
        <mat-label>Nome</mat-label>
        <input matInput [(ngModel)]="data.name">
      </mat-form-field>
      <mat-form-field>
        <mat-label>Estrelas Atuais</mat-label>
        <input matInput type="number" [(ngModel)]="data.currentStars">
      </mat-form-field>
      <mat-form-field>
        <mat-label>Estrelas Anteriores</mat-label>
        <input matInput type="number" [(ngModel)]="data.previousStars">
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancelar</button>
      <button mat-button [mat-dialog-close]="data" cdkFocusInitial>Salvar</button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-form-field {
      display: block;
      margin-bottom: 20px;
    }
  `]
})
export class EditStudentDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditStudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}