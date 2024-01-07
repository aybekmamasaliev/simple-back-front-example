import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MainServiseService } from 'src/app/services/main-servise.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css'],
})
export class CreatePageComponent implements OnDestroy {

  unSubscribe:Subject<void> = new Subject<void>()

  createForm = this.fb.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    img: ['', Validators.required],
    description: ['', Validators.required],
    count: ['', Validators.required],
    type: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private mainService: MainServiseService,
    private route: Router
  ) {}

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }

  sendProduct() {
    if (this.createForm.valid) {
      this.mainService
        .addProduct(this.createForm.value)
        .pipe(takeUntil(this.unSubscribe))
        .subscribe((res) => {
          console.log(res)
          alert("ok")
          this.createForm.reset()
        });
    }
  }

  goMain(){
    this.route.navigate(['/'])
  }
}
