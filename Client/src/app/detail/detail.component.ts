import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieModel } from '../_models/movieModel';
import { MovieService } from '../_services/movie.service';

import { map } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';
import { CartService } from '../_services/cart.service';
import { CartModel } from '../_models/cartModel';

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

  constructor(private route: ActivatedRoute, private router: Router, 
    private movieService: MovieService,
    private cartService: CartService, 
    private toastr: ToastrService) { }

  ngOnInit(): void {

    let id = this.route.snapshot.params.id; /*research in guard validation*/
    
     this.movieService.getMovieById(id)
     .pipe(
        map((movie) => { /* USE map if need to overwrite the data or transform it. data.title = data.title + "TEST";*/
            return movie;
        })
     )
     .subscribe({
        next: (movie: MovieModel) => {
          this.movie = movie;
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

  rent()
  {
    let cart: CartModel= {
                  title: this.movie.title,
                  description: this.movie.description,
                  mainPhoto: this.movie.mainPhotoPath,
                  price: this.movie.price
              };

    this.cartService.addToCart(cart)
      .subscribe({
          next: () => {
            this.toastr.info(cart.title + " Added to Cart!", "Success");
            this.router.navigate(['/cart']);
          },
          error: () => {
            this.router.navigate(['/cart']); /* TODO: Redirect to error page*/
          }
      });
  }
}
