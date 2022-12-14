import { Component, OnDestroy } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs: Subscription;

  constructor() {

    // this.retonaObservable().pipe(
    //   retry(1)
    // ).subscribe(
    //   valor => console.log('Subs: ', valor),
    //   error => console.log('Error sub:', error),
    //   () => console.log('Complete')
    // );
    this.intervalSubs = this.retornaIntervalo().subscribe(
      (valor) => console.log(valor)
    )
  }


  retornaIntervalo(): Observable<number> {
    return interval(100)
      .pipe(
        // take(1000),
        map(valor => valor + 1),
        filter(valor => (valor % 2 === 0) ? true : false),
      );
  }

  retonaObservable(): Observable<number> {
    let i = -1;
    return new Observable<number>(observer => {
      const interval = setInterval(() => {
        i++;
        // valor emitido
        observer.next(i);
        if (i === 4) {
          clearInterval(interval);
          observer.complete();
        }

        if (i === 2) {
          observer.error('Error 2');
        }
      }, 1000)

    })
  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

}
