import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { MovieModel } from '../_models/movieModel';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private baseUrl: string = 'https://rentmovievanzappapi.azurewebsites.net/api/';

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  getMovies() {
    return this.http.get<MovieModel[]>(this.baseUrl + 'movie');
  }

  getMovieById(id: number) {
    return this.http.get<MovieModel>(this.baseUrl + 'movie/' + id);
  }
}

