import { Injectable, OnInit } from '@angular/core';
import { Cart } from '../_models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit {

  carts: Cart[] = [];
  
  constructor() { 
    this.carts.push
    (
      {
        title: "Movie1",
        description: "Movie1Description1",
        mainPhoto: "https://res.cloudinary.com/dxlzpiz28/image/upload/v1689902723/MoviePicture/johnwick4_rwycof.webp",
        price: 3.0
      },
      {
        title: "Movie2",
        description: "Movie1Description2",
        mainPhoto: "https://res.cloudinary.com/dxlzpiz28/image/upload/v1689546610/MoviePicture/mario_q9gggm.webp",
        price: 2.20
      }
    )
  }

  ngOnInit(): void {
   
  }

  getCarts(): Cart[]
  {
    return this.carts;
  }
  
  addToCart(cart: Cart)
  {
    this.carts.push(cart);
  }

  removeFromCart(cart: Cart) : Cart[] 
  {
    const index = this.carts.indexOf(cart);
    
    if (index > -1) 
    { 
      this.carts.splice(index, 1);
    }

    return this.carts;
  }

}