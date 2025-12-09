import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-director-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  template: `
    <h2 mat-dialog-title>{{ data.Name }}</h2>
    <mat-dialog-content>
      <p>Born: {{ data.Birth }}</p>
      <p *ngIf="data.Death">Died: {{ data.Death }}</p>
      <p>{{ data.Bio }}</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close color="primary">OK</button>
    </mat-dialog-actions>
  `,
  styles: []
})
export class DirectorDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Bio: string;
      Birth: string;
      Death: string;
    }
  ) {}

  ngOnInit(): void {}
}