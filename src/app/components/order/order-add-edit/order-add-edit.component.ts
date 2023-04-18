import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OrderDTO} from "../dto/OrderDTO";
import {Subscription} from "rxjs";
import {OrderAddEditService} from "../../../services/order/order-add-edit.service";
import * as _ from 'underscore';
import {Router} from "@angular/router";
import {Location} from "@angular/common";


@Component({
  selector: 'app-order-add-edit',
  templateUrl: './order-add-edit.component.html',
  styleUrls: ['./order-add-edit.component.css']
})
export class OrderAddEditComponent implements OnInit,OnDestroy{


  orderForm : FormGroup;
  order = new OrderDTO();
  pageType: string;
  products: any = [];
  hardwares: any = [];
  orderAmount: any;
  productPrice : any;

  onOrderChangeSub = new Subscription();

  constructor(
    private orderAddEditService : OrderAddEditService,
    private formBuilder : FormBuilder,
    private router: Router,
    private location : Location


  ){}

  ngOnInit(): void {

    this.orderAddEditService.onProductsChanged
      .subscribe((products)=>{
        // console.log("products",products)
        this.products = products;
      });

    this.orderAddEditService.onHardwaresChanged
      .subscribe((hardwares)=>{
        // console.log("hardwares",hardwares)
        this.hardwares = hardwares;
      });

    this.onOrderChangeSub = this.orderAddEditService.order
      .subscribe((order) => {
        if (!_.isEmpty(order)){
          // console.log(order);
          this.order = new OrderDTO(order);
          this.pageType ='edit';
        }else {
          this.order = new OrderDTO(order);
          this.pageType = 'new';
        }
        // console.log("hardware" , this.hardware)
        this.orderForm = this.createForm();
      })
  }

  ngOnDestroy(): void {
    this.onOrderChangeSub.unsubscribe();
  }

  createForm(){
    return this.formBuilder.group({
      orderID: [this.order.orderID],
      invoiceNumber: [this.order.invoiceNumber,[Validators.required]],
      orderDate : [this.order.orderDate,[Validators.required]],
      hardwareID : [this.order.hardwareID, [Validators.required]],
      hardwareName : [this.order.hardwareName,],
      productID : [this.order.productID,[Validators.required]],
      productCode : [this.order.productCode,],
      productName : [this.order.productName,],
      productPrice : [this.order.productPrice,],
      orderQuantity : [this.order.orderQuantity,[Validators.required]],
      orderAmount : [this.order.orderAmount,[Validators.required]],
      paymentMethod : [this.order.paymentMethod,[Validators.required]],
      paymentStatus : [this.order.paymentStatus,[Validators.required]]
    });
  }

  isValid(){
    return this.orderForm.valid;
  }

  isDirty(){
    return this.orderForm.dirty;
  }

  saveOrder(){
    let order = this.orderForm.getRawValue();
    // console.log("get data", product)
    this.orderAddEditService.saveOrder(order);
    if (order){
      alert("Data Saved");
      this.location.back()
    }
  }

  goBack(){
    // console.log("click")
    // this.router.navigate(['admin/orders']) //using router link
    this.location.back();
  }

  changeProduct(e) {
    // console.log(e.target.value)

    let productID = e.target.value;

    // console.log(productID)
    this.orderAddEditService.getProductPriceByID(productID);
    this.orderAddEditService.productPrice
      .subscribe((productPrice) => {
        // console.log(productPrice)
        this.productPrice = productPrice;
      })



  }

  calculateAmount(q){
    // console.log(q.target.value)
    let orderQuantity = q.target.value;

    let orderAmount = this.productPrice * orderQuantity;
    this.orderAmount = orderAmount;
    // console.log(orderAmount);



  }



}
