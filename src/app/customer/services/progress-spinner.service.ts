import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
<<<<<<< HEAD
=======

>>>>>>> tuan
@Injectable({
  providedIn: 'root'
})
export class ProgressSpinnerService {
  private isActiveBSub: BehaviorSubject<boolean> = new BehaviorSubject(false)
  public isActive$: Observable<boolean> = this.isActiveBSub.asObservable()
  constructor() {
    this.isActive$.subscribe(v => console.log("Spinner " + v))
  }
<<<<<<< HEAD
  next(value: boolean){
=======
  next(value: boolean) {
>>>>>>> tuan
    this.isActiveBSub.next(value)
  }
}
