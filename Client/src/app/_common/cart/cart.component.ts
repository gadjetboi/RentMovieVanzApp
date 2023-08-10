import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { CartModel } from 'src/app/_models/cartModel';
import { CartService } from 'src/app/_services/cart.service';

import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  carts: CartModel[] = [];
  totalPrice: number = 0;
  displayedColumns: string[] = ['mainPhoto', 'price', 'title', 'description', 'action'];
  dsCarts = new MatTableDataSource<CartModel>();
  
  constructor(private cartService: CartService, private router: Router, 
              private toastr: ToastrService) { 
  
  }

  ngOnInit(): void {
    
    this.cartService.getCarts()
      .pipe(
          map((data) => { /* USE map if need to overwrite the data or transform it. data.title = data.title + "TEST";*/
            return data;
          })
      )
     .subscribe({
        next: (carts: CartModel[]) => {
          
          this.dsCarts.data = carts;
    
          this.computeTotalPrice(carts);
        },
        error: () => {
          this.router.navigate(['/cart']); /* TODO: Redirect to error page*/
        }
     });
  }

  removeItem(cart: CartModel): void {

    this.cartService.removeFromCart(cart)
      .pipe(
          map((data) => { /* USE map if need to overwrite the data or transform it. data.title = data.title + "TEST";*/
            return data;
          })
      )
     .subscribe({
        next: (carts: CartModel[]) => {
          
          this.dsCarts.data = carts;
    
          this.computeTotalPrice(carts);

          this.toastr.info(cart.title + " Removed from Cart!", "Success");
        },
        error: () => {
          this.router.navigate(['/cart']); /* TODO: Redirect to error page*/
        }
     });
  }

  computeTotalPrice(carts: CartModel[])
  {
    this.totalPrice = 0;

    carts.forEach(cart  => {
      this.totalPrice += cart.price;
    });
  }

  checkOut()
  {
    this.toastr.info("Development is still in progress...");
  }

}
