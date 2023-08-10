import { Injectable, OnInit } from '@angular/core';
import { CartModel } from '../_models/cartModel';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit {

  carts: CartModel[] = [];
  
  private baseUrl: string = 'https://rentmovievanzappapi.azurewebsites.net/api/';
  //private baseUrl: string = 'https://localhost:7109/api/';

  constructor(private http: HttpClient, private toastr: ToastrService) { 

  }

  ngOnInit(): void {
   
  }

  getCarts()
  {
    return this.http.get<CartModel[]>(this.baseUrl + 'Carts');
  }
  
  addToCart(cart: CartModel)
  {
    return this.http.post<CartModel[]>(this.baseUrl + 'Carts/add-cart', cart);
  }

  removeFromCart(cart: CartModel)
  {
    return this.http.post<CartModel[]>(this.baseUrl + 'Carts/remove-cart', cart);
  }

}