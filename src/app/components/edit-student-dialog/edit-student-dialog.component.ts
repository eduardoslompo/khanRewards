import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-edit-student-dialog',
  templateUrl: './edit-student-dialog.component.html',
  styleUrls: ['./edit-student-dialog.component.css']
})
export class EditStudentDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditStudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student
  ) {
    this.form = this.fb.group({
      name: [data.name, Validators.required],
      currentStars: [data.currentStars, [Validators.required, Validators.min(0)]],
      previousStars: [data.previousStars, [Validators.required, Validators.min(0)]],
      collectedPrizes: [data.collectedPrizes.join(', '), Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const updatedStudent: Student = {
        ...this.data,
        ...this.form.value,
        collectedPrizes: this.form.value.collectedPrizes.split(',').map((prize: string) => prize.trim())
      };
      this.dialogRef.close(updatedStudent);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}