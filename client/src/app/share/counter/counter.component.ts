import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnChanges {

  constructor() { }

  @Input() item: any;

  counterValue = 0;
  @Output() counterChange = new EventEmitter();

  @Input()
  get counter() {
    return this.counterValue;
  }

  set counter(val) {
    this.counterValue = val;
  }

  decrement() {
    if (this.counter > 0) {
      this.counterValue = this.counter - 1;
      this.counterChange.emit(this.counterValue);
    }
  }

  increment() {
    this.counterValue = this.counter + 1;
    this.counterChange.emit(this.counterValue);
  }


  ngOnChanges(changes) {
    console.log(changes)
  }
}
