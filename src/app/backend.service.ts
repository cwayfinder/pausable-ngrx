import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { randomInt, randomUpdate } from './random';

@Injectable({ providedIn: 'root' })
export class BackendService {

  update$ = new Observable<{ type: string, value: any }>(observer => {
    function schedule() {
      const delay = randomInt(0, 1000);
      setTimeout(() => {
        observer.next(randomUpdate());
        schedule();
      }, delay);
    }

    schedule();
  });
}
