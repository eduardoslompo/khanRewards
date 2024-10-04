import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-edit-student-dialog',
  templateUrl: './edit-student-dialog.component.html',
  styleUrls: ['./edit-student-dialog.component.css']
})
export class EditStudentDialogComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditStudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: [data.name, Validators.required],
      currentStars: [data.currentStars, [Validators.required, Validators.min(0)]],
      previousStars: [data.previousStars, [Validators.required, Validators.min(0)]],
      collectedPrizes: [data.collectedPrizes.join(', ')]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const updatedStudent: Student = {
        ...this.data,
        ...this.form.value,
        collectedPrizes: this.form.value.collectedPrizes.split(',').map((prize: string) => prize.trim()).filter((prize: string) => prize !== '')
      };
      this.dialogRef.close(updatedStudent);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}