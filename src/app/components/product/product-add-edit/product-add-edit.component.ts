import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductAddEditService} from "../../../services/product/product-add-edit.service";
import * as _ from 'underscore';
import {ProductDTO} from "../dto/product";
import {Subscription} from "rxjs";
import {Location} from "@angular/common";

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.css']
})
export class ProductAddEditComponent implements OnInit, OnDestroy{

  productForm : FormGroup;
  product = new ProductDTO();
  pageType: string;

  onProductChangeSub = new Subscription();

  constructor(
    private productAddEditService : ProductAddEditService,
    private formBuilder : FormBuilder,
    private location :Location

){}

  ngOnInit(): void {
    this.onProductChangeSub = this.productAddEditService.product
      .subscribe((product) => {
        if (!_.isEmpty(product)){
          // console.log(product);
          this.product = new ProductDTO(product);
          this.pageType ='edit';
        }else {
          this.product = new ProductDTO();
          this.pageType = 'new';
        }
        // console.log("hardware" , this.hardware)
        this.productForm = this.createForm();
      })
  }

  ngOnDestroy(): void {
    this.onProductChangeSub.unsubscribe();
}

  createForm(){
    return this.formBuilder.group({
      productID: [this.product.productID],
      productCode: [this.product.productCode,[Validators.required]],
      productName : [this.product.productName,[Validators.required]],
      productSize : [this.product.productSize,[Validators.required]],
      productPrice : [this.product.productPrice,[Validators.required]],
      productStatus : [this.product.productStatus,[Validators.required]]
    })
  }

  isValid(){
    return this.productForm.valid;
  }

  isDirty(){
    return this.productForm.dirty;
  }

  goBack(){
    // console.log("click")
    // this.router.navigate(['admin/orders']) //using router link
    this.location.back();
  }

  saveProduct(){
    let product = this.productForm.getRawValue();
    console.log("get data", product);
      this.productAddEditService.saveProduct(product);
    if (product){
      // console.log(product);
      alert("Data Saved");
      this.location.back()
    }
  }

}

