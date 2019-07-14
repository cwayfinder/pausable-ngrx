import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './state/reducers';
import { Observable } from 'rxjs';
import { changeColor, changeSize, move } from './state/actions';
import { BackendService } from './backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private x$: Observable<number>;
  private y$: Observable<number>;
  private color$: Observable<string>;
  private size$: Observable<number>;

  constructor(private store: Store<AppState>, private backend: BackendService) {}

  ngOnInit(): void {
    this.x$ = this.store.select('dot', 'position', 'x');
    this.y$ = this.store.select('dot', 'position', 'y');
    this.color$ = this.store.select('dot', 'color');
    this.size$ = this.store.select('dot', 'size');

    this.backend.update$.subscribe(({ type, value }) => {
      // TODO: trigger new NgRx action when all animations ended
      if (type === 'position') {
        this.store.dispatch(move(value));
      } else if (type === 'color') {
        this.store.dispatch(changeColor({ color: value }));
      } else if (type === 'size') {
        this.store.dispatch(changeSize({ size: value }));
      }
    });
  }

  transitionStart() {
    // TODO: pause NgRx actions stream
  }

  transitionEnd() {
    // TODO: resume NgRx actions stream
  }
}
