import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
})
export class TabsComponent implements OnInit, OnDestroy {
  @Input() tabs: any;
  @Input() controll: any;

  unSubscribe = new Subject<void>();

  constructor() {}

  ngOnInit(): void {
  }

  ngOnDestroy():void{
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }
}
