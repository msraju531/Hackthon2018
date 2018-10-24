import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class DataService {

    private manualsData = new BehaviorSubject<any>(null);
    manualData = this.manualsData.asObservable();
    constructor() { }

    changeManual(manual: any) {
        this.manualsData.next(manual)
      }
      
}