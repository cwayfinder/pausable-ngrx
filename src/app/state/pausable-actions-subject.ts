    import { Injectable } from '@angular/core';
    import { Action, ActionsSubject } from '@ngrx/store';
    import { BehaviorSubject, defer, from, merge, Observable, Subject } from 'rxjs';
    import { bufferToggle, distinctUntilChanged, filter, map, mergeMap, share, tap, windowToggle } from 'rxjs/operators';

    @Injectable()
    export class PausableActionsSubject extends ActionsSubject {

      queue$ = new Subject<Action>();
      active$ = new BehaviorSubject<boolean>(true);

      constructor() {
        super();

        const active$ = this.active$.pipe(distinctUntilChanged());
        active$.subscribe(active => {
          if (!active) {
            console.time('pauseTime');
          } else {
            console.timeEnd('pauseTime');
          }
        });

        const on$ = active$.pipe(filter(v => v));
        const off$ = active$.pipe(filter(v => !v));

        this.queue$.pipe(
          share(),
          pause(on$, off$, v => this.active$.value)
        ).subscribe(action => {
          console.log('action', action);
          super.next(action);
        });
      }

      next(action: Action): void {
        this.queue$.next(action);
      }

      pause(): void {
        this.active$.next(false);
      }

      resume(): void {
        this.active$.next(true);
      }
    }

    export function pause<T>(on$: Observable<any>, off$: Observable<any>, haltCondition: (value: T) => boolean) {
      return (source: Observable<T>) => defer(() => { // defer is used so that each subscription gets its own buffer
        let buffer: T[] = [];
        return merge(
          source.pipe(
            bufferToggle(off$, () => on$),
            // append values to your custom buffer
            tap(values => buffer = buffer.concat(values)),
            // find the index of the first element that matches the halt condition
            map(() => buffer.findIndex(haltCondition)),
            // get all values from your custom buffer until a haltCondition is met
            map(haltIndex => buffer.splice(0, haltIndex === -1 ? buffer.length : haltIndex + 1)),
            // spread the buffer
            mergeMap(toEmit => from(toEmit)),
          ),
          source.pipe(
            windowToggle(on$, () => off$),
            mergeMap(x => x),
          ),
        );
      });
    }
