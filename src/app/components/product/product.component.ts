import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MainServiseService } from 'src/app/services/main-servise.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit, OnDestroy {
  productId: string | null = '';
  term = '';
  loading = false;
  unSubscribe: Subject<void> = new Subject<void>();
  currentProd: any;
  form = this.fb.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    img: ['', Validators.required],
    description: ['', Validators.required],
    count: ['', Validators.required],
    type: ['', Validators.required],
  });

  constructor(
    private route: ActivatedRoute,
    private mainservice: MainServiseService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe((params) => {
      this.productId = params['id'];
    });

    this.mainservice
      .getPizzaById(this.productId)
      .pipe(takeUntil(this.unSubscribe))
      .subscribe((item) => {
        this.currentProd = item;
        this.loading = false;
        this.fillForm();
      });
  }

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }

  fillForm() {
    this.form.setValue({
      name: this.currentProd?.name,
      price: this.currentProd?.price,
      img: this.currentProd?.img,
      description: this.currentProd?.description,
      count: this.currentProd?.count,
      type: this.currentProd?.type,
    });
  }

  display() {
    if (this.productId && this.form.valid) {
      this.mainservice
        .updateProduct(this.productId, this.form.value)
        .subscribe((res) => {
          console.log(res);
        });
      this.form.reset();
    }
  }
}
