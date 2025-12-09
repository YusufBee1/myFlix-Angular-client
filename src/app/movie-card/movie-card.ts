import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// UI Imports
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common'; // Required for *ngFor

// Import Dialogs
import { GenreDialogComponent } from '../genre-dialog/genre-dialog';
import { DirectorDialogComponent } from '../director-dialog/director-dialog';
import { MovieDetailsDialogComponent } from '../movie-details-dialog/movie-details-dialog';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css'
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  openGenre(genre: any): void {
    this.dialog.open(GenreDialogComponent, {
      data: {
        Name: genre.Name,
        Description: genre.Description,
      },
      width: '280px'
    });
  }

  openDirector(director: any): void {
    this.dialog.open(DirectorDialogComponent, {
      data: {
        Name: director.Name,
        Bio: director.Bio,
        Birth: director.Birth,
        Death: director.Death || 'N/A',
      },
      width: '280px'
    });
  }

  openSynopsis(description: string): void {
    this.dialog.open(MovieDetailsDialogComponent, {
      data: {
        Title: 'Synopsis',
        Description: description,
      },
      width: '280px'
    });
  }

  addFavorite(id: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {
      this.snackBar.open('Movie added to favorites.', 'OK', {
        duration: 2000
      });
    });
  }
}