import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KLPService {
    productName:any=[];
    private _product$ = new BehaviorSubject<any>({});
    selectedProduct$ = this._product$.asObservable();
  
    setProduct(product: any) {
      console.log('product is',product);
      this._product$.next(product);
    }
  
 setKLP(selectedRiskKLP:any){

      this.productName = selectedRiskKLP;
      console.log('this._productName',this.productName);
    }
  
 getKLP(){
        console.log('get KLP',this.productName);
      return this.productName;
    }
  constructor() { }

}