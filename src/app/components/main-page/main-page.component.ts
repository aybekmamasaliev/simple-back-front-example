import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, pipe, take, takeUntil } from 'rxjs';
import { MainServiseService } from 'src/app/services/main-servise.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  products: any;
  filteredProducts: any;
  unSubscribe: Subject<void> = new Subject<void>();
  loading: boolean = true;
  chooseId: string = '';
  tabFormControl: FormControl = new FormControl('');

  tabs = [
    { name: 'All', value: '', id: 0 },
    { name: 'Sushi', value: 'sushi', id: 1 },
    { name: 'Burger2 ', value: 'burgers2', id: 2 },
    { name: 'Drinks ', value: 'drinks', id: 3 },
    { name: 'Rewievs ', value: 'rewievs', id: 4 },
    { name: 'Salats ', value: 'salats', id: 5 },
    { name: 'Rolls ', value: 'rolls', id: 6 },
    { name: 'Pizza ', value: 'pizza', id: 7 },
    { name: 'Decerts ', value: 'decerts', id: 8 },
  ];

  newTabs=[
    { name: 'New drinks', value: 'ndrinks', id: 9 },
    { name: 'New pizzas', value: 'npizzas', id: 10 },
    { name: 'New burgers', value: 'nburgers', id: 11 },
    { name: 'New rolls', value: 'nrolls', id: 13 },
    { name: 'New decerts', value: 'ndecerts', id: 14 },
    { name: 'New sushi', value: 'nsushi', id: 15 },
    { name: 'New salats', value: 'nsalats', id: 16 },

  ]

  constructor(
    private mainservice: MainServiseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.mainservice
      .getPizzas()
      .pipe(takeUntil(this.unSubscribe))
      .subscribe((item) => {
        this.loading = true;
        this.products = item;
        this.filteredProducts = item;
        this.loading = false;
      });

    this.tabFormControl.valueChanges
      .pipe(takeUntil(this.unSubscribe))
      .subscribe((prod: any) => {
        this.filteredProducts = this.products.filter((items: { type: any }) => {
          if (prod === '') {
            return this.products;
          } else {
            return items.type == prod;
          }
        });
      });
  }

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }

  navigate(id: any) {
    this.router.navigate(['/products', id]);
    this.chooseId = id;
  }

  createProduct() {
    this.router.navigate(['create-product']);
  }

  deleteProduct(id: string) {
    this.mainservice
      .deleteProduct(id)
      .pipe(takeUntil(this.unSubscribe))
      .subscribe(() => {
        alert('ok');
        this.mainservice
          .getPizzas()
          .pipe(takeUntil(this.unSubscribe))
          .subscribe(() => {});
      });
  }
}
