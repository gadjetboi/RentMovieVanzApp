import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieModel } from '../_models/movieModel';
import { MovieService } from '../_services/movie.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  movie: MovieModel = {} as MovieModel;
  userId: number;
  isContentAvailable: boolean = false;
  showTrailer: boolean = false;

  constructor(private route: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit(): void {

    let id = this.route.snapshot.params.id;

     this.movieService.getMovieById(id).subscribe(
      (data : MovieModel) =>{
        this.movie = data;
        this.isContentAvailable = true;
      } 
    );
  }

  watchTrailer(): void{
    this.showTrailer = true;
  }

}
