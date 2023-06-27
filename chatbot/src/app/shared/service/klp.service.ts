import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {KLPModel} from './klp.model';

@Injectable()
export class KLPService {
 public KLP :string[]=[];

    productName:any=[];
    public _product$ = new BehaviorSubject<any>('hello');
    selectedProduct$ = this._product$.asObservable();
  injector: any;
    constructor(){
    //  const AuthService = this.injector.get(KLPService);
     // this.klp.count++; 
    }
  
    setProduct(product: any) {
      console.log('product is',product);
      this._product$.next(product);
      this._product$.complete();
      this.selectedProduct$ = this._product$.asObservable();
      console.log('thsi._product',this._product$);
    }
  
 setKLP(selectedRiskKLP:any){

      this.productName = selectedRiskKLP;
      console.log('this._productName',this.productName);
    }
    
 getKLP(): Observable<any>{
        console.log('get KLP',this.productName);
      return this.productName;
    }


}