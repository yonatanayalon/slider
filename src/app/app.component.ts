import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { NgRedux } from '@angular-redux/store'; // <- New
import { CounterActions } from './app.actions'; // <- New
import {IAppState} from '../store';
import {MdSliderChange} from "@angular/material"; // <- New


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app works!';
  count: number;
  subscription; // <- New;

  @ViewChild('mySlider') 'mySlider';

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private actions: CounterActions) {
    this.subscription = ngRedux.select<number>('count') // <- New
      .subscribe(newCount => this.count = newCount);    // <- New
  }

  ngOnInit() {}

  ngOnDestroy() {                    // <- New
    this.subscription.unsubscribe(); // <- New
  }

  sliderChanged(data: MdSliderChange) {
    console.log("changed: ",data.value);
  }

  increment() {
    this.ngRedux.dispatch(this.actions.increment()); // <- New
  }

  decrement() {
    this.ngRedux.dispatch(this.actions.decrement()); // <- New
  }
}
