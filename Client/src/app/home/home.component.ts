import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { MovieModel } from 'src/app/_models/movieModel';
import { MovieService } from 'src/app/_services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  moviesSection1: MovieModel[] = [];
  moviesSection2: MovieModel[] = [];
  moviesSection3: MovieModel[] = [];
  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    // this.movieService.getMovies().subscribe({
    //   next: data => this.moviesSection1 = data
    // })
   this.movieService.getMovies().pipe(
      map((movies: MovieModel[]) => {
          if (movies.length > 4) {
              return movies.slice(0, 4);
          }
      })
    ).subscribe({
      next: data => this.moviesSection1 = data
    });

    this.movieService.getMovies().pipe(
      map((movies: MovieModel[]) => {
          if (movies.length > 4) {
              return movies.slice(4, 8);
          }
      })
    ).subscribe({
      next: data => this.moviesSection2 = data
    });

    this.movieService.getMovies().pipe(
      map((movies: MovieModel[]) => {
          if (movies.length > 4) {
              return movies.slice(8, 12);
          }
      })
    ).subscribe({
      next: data => this.moviesSection3 = data
    });
    
    
    console.log(this.moviesSection1);

  }
}
