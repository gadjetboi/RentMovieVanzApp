import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieModel } from '../_models/movieModel';
import { MovieService } from '../_services/movie.service';

import { map, catchError } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';



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
  isTrailerClose: boolean;

  constructor(private route: ActivatedRoute, private router: Router, private movieService: MovieService, private toastr: ToastrService) { }

  ngOnInit(): void {

    let id = this.route.snapshot.params.id; /*research in guard validation*/
    
     this.movieService.getMovieById(id)
     .pipe(
        map((data) => { /* USE map if need to overwrite the data or transform it. data.title = data.title + "TEST";*/
            return data;
        })
     )
     .subscribe({
        next: (data: MovieModel) => {
          this.movie = data;
          this.isContentAvailable = true;
        },
        error: () => {
          this.router.navigate(['/home']);
        }
     });
  }

  watchTrailer(): void{
    this.showTrailer = true;
  }

  setShowTrailer(isStopVideo: boolean):void{
    this.showTrailer = (isStopVideo == true) ? false : true;
  }
}
