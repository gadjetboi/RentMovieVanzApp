import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Cart } from 'src/app/_models/cart';
import { CartService } from 'src/app/_services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  carts: Cart[] = [];
  totalPrice: number = 0;
  displayedColumns: string[] = ['mainPhoto', 'price', 'title', 'description', 'action'];
  dsCarts = new MatTableDataSource<Cart>();
  
  constructor(private cartService: CartService) { 
  
  }

  ngOnInit(): void {
    this.carts = this.cartService.getCarts();
    this.dsCarts.data = this.carts
    this.computeTotalPrice();
  }

  removeItem(cart: Cart): void {
    this.carts = this.cartService.removeFromCart(cart);
    this.dsCarts.data = this.carts;
    this.computeTotalPrice();
  }

  computeTotalPrice()
  {
    this.totalPrice = 0;
    this.carts.forEach(cart  => {
      this.totalPrice += cart.price;
    });
  }

}
